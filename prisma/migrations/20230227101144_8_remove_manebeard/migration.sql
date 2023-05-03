/*
  Warnings:

  - You are about to drop the column `maneBeard` on the `childNft` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[gender,background,clothing,eyes,headgear,mouth,skin]` on the table `childNft` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "childNft_gender_background_clothing_eyes_headgear_mouth_ski_key";

-- AlterTable
ALTER TABLE "childNft" DROP COLUMN "maneBeard";

-- CreateIndex
CREATE UNIQUE INDEX "childNft_gender_background_clothing_eyes_headgear_mouth_ski_key" ON "childNft"("gender", "background", "clothing", "eyes", "headgear", "mouth", "skin");
