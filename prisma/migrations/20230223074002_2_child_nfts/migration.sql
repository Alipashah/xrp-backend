/*
  Warnings:

  - You are about to drop the `bredNft` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "bredNft";

-- CreateTable
CREATE TABLE "parentNft" (
    "parentId" SERIAL NOT NULL,
    "bredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tokenId" BYTEA NOT NULL,
    "isBred" BOOLEAN NOT NULL,
    "gender" "Gender" NOT NULL,
    "spouseId" BYTEA NOT NULL,
    "childId" INTEGER NOT NULL,

    CONSTRAINT "parentNft_pkey" PRIMARY KEY ("parentId")
);

-- CreateTable
CREATE TABLE "childNft" (
    "childId" SERIAL NOT NULL,
    "bornAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tokenId" BYTEA,
    "gender" "Gender" NOT NULL,
    "background" TEXT NOT NULL,
    "clothing" TEXT NOT NULL,
    "eyes" TEXT NOT NULL,
    "headgear" TEXT NOT NULL,
    "mouth" TEXT NOT NULL,
    "Skin" TEXT NOT NULL,
    "maneBeard" TEXT,

    CONSTRAINT "childNft_pkey" PRIMARY KEY ("childId")
);

-- CreateIndex
CREATE UNIQUE INDEX "parentNft_tokenId_key" ON "parentNft"("tokenId");

-- CreateIndex
CREATE UNIQUE INDEX "parentNft_spouseId_key" ON "parentNft"("spouseId");

-- CreateIndex
CREATE UNIQUE INDEX "childNft_tokenId_key" ON "childNft"("tokenId");

-- AddForeignKey
ALTER TABLE "parentNft" ADD CONSTRAINT "parentNft_childId_fkey" FOREIGN KEY ("childId") REFERENCES "childNft"("childId") ON DELETE RESTRICT ON UPDATE CASCADE;
