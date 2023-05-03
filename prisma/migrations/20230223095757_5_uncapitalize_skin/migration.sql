/*
  Warnings:

  - You are about to drop the column `Skin` on the `childNft` table. All the data in the column will be lost.
  - Added the required column `skin` to the `childNft` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "childNft" DROP COLUMN "Skin",
ADD COLUMN     "skin" TEXT NOT NULL;
