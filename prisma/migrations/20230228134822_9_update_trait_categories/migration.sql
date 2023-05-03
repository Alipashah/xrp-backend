/*
  Warnings:

  - Added the required column `accesories` to the `childNft` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eyewear` to the `childNft` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "childNft" ADD COLUMN     "accesories" TEXT NOT NULL,
ADD COLUMN     "eyewear" TEXT NOT NULL;
