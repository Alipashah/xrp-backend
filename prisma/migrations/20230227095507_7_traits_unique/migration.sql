/*
  Warnings:

  - A unique constraint covering the columns `[gender,background,clothing,eyes,headgear,mouth,skin,maneBeard]` on the table `childNft` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `isBorn` to the `childNft` table without a default value. This is not possible if the table is not empty.
  - Made the column `maneBeard` on table `childNft` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "childNft" ADD COLUMN     "isBorn" BOOLEAN NOT NULL,
ALTER COLUMN "bornAt" DROP NOT NULL,
ALTER COLUMN "bornAt" DROP DEFAULT,
ALTER COLUMN "maneBeard" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "childNft_gender_background_clothing_eyes_headgear_mouth_ski_key" ON "childNft"("gender", "background", "clothing", "eyes", "headgear", "mouth", "skin", "maneBeard");
