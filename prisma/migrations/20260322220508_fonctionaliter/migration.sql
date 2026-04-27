/*
  Warnings:

  - You are about to drop the column `stage` on the `Deal` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Deal" DROP COLUMN "stage",
ADD COLUMN     "stageId" INTEGER;

-- DropEnum
DROP TYPE "DealStage";

-- CreateTable
CREATE TABLE "DealStage" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "DealStage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Deal" ADD CONSTRAINT "Deal_stageId_fkey" FOREIGN KEY ("stageId") REFERENCES "DealStage"("id") ON DELETE SET NULL ON UPDATE CASCADE;
