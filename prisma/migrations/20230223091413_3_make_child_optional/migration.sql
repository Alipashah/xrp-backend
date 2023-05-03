-- DropForeignKey
ALTER TABLE "parentNft" DROP CONSTRAINT "parentNft_childId_fkey";

-- AlterTable
ALTER TABLE "parentNft" ALTER COLUMN "childId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "parentNft" ADD CONSTRAINT "parentNft_childId_fkey" FOREIGN KEY ("childId") REFERENCES "childNft"("childId") ON DELETE SET NULL ON UPDATE CASCADE;
