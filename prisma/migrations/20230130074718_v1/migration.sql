/*
  Warnings:

  - You are about to drop the column `child` on the `bredNft` table. All the data in the column will be lost.
  - You are about to drop the column `spouse` on the `bredNft` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[spouseId]` on the table `bredNft` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `spouseId` to the `bredNft` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "bredNft_spouse_key";

-- AlterTable
ALTER TABLE "bredNft" DROP COLUMN "child",
DROP COLUMN "spouse",
ADD COLUMN     "spouseId" BYTEA NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "bredNft_spouseId_key" ON "bredNft"("spouseId");
