/*
  Warnings:

  - The primary key for the `Deal` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `company` on the `Deal` table. All the data in the column will be lost.
  - The `id` column on the `Deal` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Deal" DROP CONSTRAINT "Deal_pkey",
DROP COLUMN "company",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Deal_pkey" PRIMARY KEY ("id");
