/*
  Warnings:

  - Added the required column `userId` to the `Deal` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "DealStage" AS ENUM ('PROSPECT', 'QUALIFIE', 'PROPOSITION', 'NEGOCIATION', 'GAGNE', 'PERDU');

-- AlterTable
ALTER TABLE "Deal" ADD COLUMN     "contactId" INTEGER,
ADD COLUMN     "entrepriseId" INTEGER,
ADD COLUMN     "stage" "DealStage" NOT NULL DEFAULT 'PROSPECT',
ADD COLUMN     "userId" TEXT NOT NULL,
ALTER COLUMN "company" DROP NOT NULL,
ALTER COLUMN "amount" DROP NOT NULL,
ALTER COLUMN "amount" SET DEFAULT 0;

-- AddForeignKey
ALTER TABLE "Deal" ADD CONSTRAINT "Deal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Deal" ADD CONSTRAINT "Deal_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "contact"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Deal" ADD CONSTRAINT "Deal_entrepriseId_fkey" FOREIGN KEY ("entrepriseId") REFERENCES "entreprise"("id") ON DELETE SET NULL ON UPDATE CASCADE;
