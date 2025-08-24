import z from "zod";
import fetch from 'node-fetch';
import { GetVideoAnalysisResultById, type GenerateVideoAnalysis } from "wasp/server/operations";
import { User, VideoAnalysis } from "wasp/entities";
import { SubscriptionStatus } from "../payment/plans";
import type { PrismaPromise } from '@prisma/client';
import { HttpError, prisma } from "wasp/server";

//#region Actions

const analyzeVideoSchema = z.object({
    videoUrl: z.string().url(),
    platform: z.enum(["instagram", "facebook", "youtube", "tiktok"]),
    type: z.enum(["cooking", "face-masks", "diy"]),
});

export type AnalyzeVideoInput = z.infer<typeof analyzeVideoSchema>;

interface AnalyzeVideoResponse {
    success: boolean;
    title: string;
    output: string;
    thumbnail_url: string;
    ingredients?: {
        name: string;
        quantity: string;
        unit: string;
    }[];
    metadata: {
        video_url: string;
        prompt: string;
        mime_type: string;
        timestamp: string;
        has_thumbnail: boolean;
        cached: boolean;
        cache_timestamp: string;
    }
}

export const generateVideoAnalysis: GenerateVideoAnalysis<AnalyzeVideoInput, VideoAnalysis> = async (input: AnalyzeVideoInput, context: any): Promise<VideoAnalysis> => {
    if (!isUserSubscribed(context.user)) {
        if (context.user.credits <= 0) {
            throw new HttpError(402, 'User has not paid or is out of credits');
        }
    }
    console.log('🎬 Starting video analysis for user:', context.user?.id);
    console.log('📍 Video URL:', input.videoUrl);
    console.log('🏷️ Platform:', input.platform);
    console.log('🔧 Type:', input.type);

    if (!context.user) {
        console.error('❌ Unauthorized access attempt');
        throw new Error("Unauthorized");
    }

    let prompt = 'Describe this video'
    switch (input.type) {
        case 'cooking':
            prompt = 'In markdown, Write a detailed recipe and cooking instructions in this video'
            break;
        case 'face-masks':
            prompt = 'In neat markdown, write the ingredients and its measurments plus benefits and instructions on how to apply from the mask made in this video.'
            break;
        case 'diy':
            prompt = 'In markdown, write a step-by-step guide for the DIY project shown in this video.'
            break;
    }

    console.log('📝 Generated prompt:', prompt);

    let body = {
        video_url: input.videoUrl,
        prompt: prompt,
        type: input.type,
    }

    console.log('🚀 Sending request to video processing API...');
    const startTime = Date.now();

    const response = await fetch('https://processvideo-ttn5cmpe7q-uc.a.run.app', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': process.env.X_API_KEY || ''
        },
        body: JSON.stringify(body),
    });

    const responseTime = Date.now() - startTime;
    console.log(`⏱️ API response received in ${responseTime}ms`);
    console.log('📊 Response status:', response.status);

    if (!response.ok) {
        console.error('❌ API request failed with status:', response.status);
        console.error('❌ Response text:', await response.text());
        throw new Error('Failed to generate video analysis');
    }

    const data = await response.json() as AnalyzeVideoResponse
    console.log('✅ API response success:', data.success);
    console.log('📹 Video title:', data.title);
    console.log('🖼️ Has thumbnail:', data.metadata.has_thumbnail);
    console.log('💾 Is cached:', data.metadata.cached);

    if (!data.success) {
        console.error('❌ Video analysis failed from API');
        throw new Error('Video analysis failed');
    }

    // check for existing entries with the same input.videoUrl
    const existingAnalysis = await context.entities.VideoAnalysis.findFirst({
        where: {
            socialMediaUrl: input.videoUrl,
        },
    });

    if (existingAnalysis) {
        console.log('📂 Found existing analysis for this video URL:', existingAnalysis.id);
        existingAnalysis.customJsonData = data.ingredients ? data.ingredients : undefined;
        return existingAnalysis;
    }

    console.log('💾 Saving analysis to database...');
    
    const analysis = await context.entities.VideoAnalysis.create({
        data: {
            createdBy: { connect: { id: context.user.id } },
            title: data.title,
            output: data.output,
            hasThumbnail: data.metadata.has_thumbnail,
            thumbnailUrl: data.thumbnail_url,
            socialMediaUrl: input.videoUrl,
            videoUrl: data.metadata.video_url,
            platform: input.platform,
            mimeType: data.metadata.mime_type,
            customJsonData: data.ingredients ? JSON.stringify(data.ingredients) : undefined,
            type: input.type,
        }
    });

    const userAnalysisRecord = context.entities.UserVideoAnalysis.create({
        data: {
            user: { connect: { id: context.user.id } },
            videoAnalysis: { connect: { id: analysis.id } },
        }
    });

    console.log('✅ Analysis saved with ID:', analysis.id);
    console.log('🎉 Video analysis completed successfully');

    const transactions: PrismaPromise<VideoAnalysis | User>[] = [userAnalysisRecord];

    // We decrement the credits for users without an active subscription
      // This way, users don't feel cheated if something goes wrong.
      // On the flipside, users can theoretically abuse this and spend more
      // credits than they have, but the damage should be pretty limited.
      //
      // Think about which option you prefer for your app and edit the code accordingly.
      if (!isUserSubscribed(context.user)) {
        console.log('🔒 User is not subscribed, checking credits...');
        if (context.user.credits > 0) {
            console.log('➖ Decrementing user credits by 1');
          const decrementCredit = context.entities.User.update({
            where: { id: context.user.id },
            data: {
              credits: {
                decrement: 1,
              },
            },
          });
          transactions.push(decrementCredit);
        } else {
          throw new HttpError(402, 'User has not paid or is out of credits');
        }
    }
    await prisma.$transaction(transactions);

    analysis.customJsonData = data.ingredients ? data.ingredients : undefined;

    return analysis;
};

export const getVideoAnalysisResultById: GetVideoAnalysisResultById<{ id: string }, VideoAnalysis> = async ({ id }, context: any): Promise<VideoAnalysis> => {
    console.log('🔍 Fetching video analysis result for ID:', id);

    if (!id) {
        console.error('❌ No ID provided for video analysis');
    }

    const analysis = await context.entities.VideoAnalysis.findUnique({
        where: { id: id },
        include: { createdBy: true }
    });

    if (!analysis) {
        console.error('❌ No video analysis found for ID:', id);
        throw new HttpError(404, 'Video analysis not found');
    }

    console.log('✅ Video analysis found');
    analysis.customJsonData = analysis.customJsonData ? JSON.parse(analysis.customJsonData) : undefined;
    return analysis;
};

function isUserSubscribed(user: User) {
  return (
    user.subscriptionStatus === SubscriptionStatus.Active ||
    user.subscriptionStatus === SubscriptionStatus.CancelAtPeriodEnd
  );
}

//#endregion