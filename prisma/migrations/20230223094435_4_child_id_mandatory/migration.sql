/*
  Warnings:

  - Made the column `tokenId` on table `childNft` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "childNft" ALTER COLUMN "tokenId" SET NOT NULL;
