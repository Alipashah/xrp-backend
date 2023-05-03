/*
  Warnings:

  - You are about to drop the column `tokenId` on the `childNft` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[txnHash]` on the table `childNft` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "childNft_tokenId_key";

-- AlterTable
ALTER TABLE "childNft" DROP COLUMN "tokenId",
ADD COLUMN     "txnHash" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "childNft_txnHash_key" ON "childNft"("txnHash");
