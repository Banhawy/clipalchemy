/*
  Warnings:

  - Added the required column `type` to the `VideoAnalysis` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "VideoAnalysis" ADD COLUMN     "customJsonData" TEXT,
ADD COLUMN     "type" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "UserVideoAnalysis" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "videoAnalysisId" TEXT NOT NULL,

    CONSTRAINT "UserVideoAnalysis_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserVideoAnalysis" ADD CONSTRAINT "UserVideoAnalysis_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserVideoAnalysis" ADD CONSTRAINT "UserVideoAnalysis_videoAnalysisId_fkey" FOREIGN KEY ("videoAnalysisId") REFERENCES "VideoAnalysis"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
