/*
  Warnings:

  - A unique constraint covering the columns `[gender,background,skin,eyewear,mouth,clothing,eyes,headgear,accesories]` on the table `childNft` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "childNft_gender_background_clothing_eyes_headgear_mouth_ski_key";

-- CreateIndex
CREATE UNIQUE INDEX "childNft_gender_background_skin_eyewear_mouth_clothing_eyes_key" ON "childNft"("gender", "background", "skin", "eyewear", "mouth", "clothing", "eyes", "headgear", "accesories");
