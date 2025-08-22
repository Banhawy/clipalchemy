/*
  Warnings:

  - A unique constraint covering the columns `[socialMediaUrl]` on the table `VideoAnalysis` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "VideoAnalysis_socialMediaUrl_key" ON "VideoAnalysis"("socialMediaUrl");
