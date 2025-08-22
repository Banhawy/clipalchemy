-- CreateTable
CREATE TABLE "VideoAnalysis" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdById" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "output" TEXT NOT NULL,
    "hasThumbnail" BOOLEAN NOT NULL DEFAULT false,
    "socialMediaUrl" TEXT NOT NULL,
    "thumbnailUrl" TEXT,
    "videoUrl" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "platform" TEXT NOT NULL,

    CONSTRAINT "VideoAnalysis_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "VideoAnalysis" ADD CONSTRAINT "VideoAnalysis_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
