/*
  Warnings:

  - Made the column `childId` on table `parentNft` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "parentNft" DROP CONSTRAINT "parentNft_childId_fkey";

-- AlterTable
ALTER TABLE "childNft" ALTER COLUMN "tokenId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "parentNft" ALTER COLUMN "childId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "parentNft" ADD CONSTRAINT "parentNft_childId_fkey" FOREIGN KEY ("childId") REFERENCES "childNft"("childId") ON DELETE RESTRICT ON UPDATE CASCADE;
