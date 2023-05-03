-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE');

-- CreateTable
CREATE TABLE "bredNft" (
    "id" SERIAL NOT NULL,
    "bredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tokenId" BYTEA NOT NULL,
    "isBred" BOOLEAN NOT NULL,
    "gender" "Gender" NOT NULL,
    "spouse" BYTEA NOT NULL,
    "child" BYTEA,

    CONSTRAINT "bredNft_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "bredNft_tokenId_key" ON "bredNft"("tokenId");

-- CreateIndex
CREATE UNIQUE INDEX "bredNft_spouse_key" ON "bredNft"("spouse");
