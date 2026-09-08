/*
  Warnings:

  - You are about to drop the `Investiments` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "TransactionType" ADD VALUE 'INVESTIMENT';
ALTER TYPE "TransactionType" ADD VALUE 'REDEMPTION';

-- DropForeignKey
ALTER TABLE "Investiments" DROP CONSTRAINT "Investiments_userId_fkey";

-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "investimentId" TEXT;

-- DropTable
DROP TABLE "Investiments";

-- CreateTable
CREATE TABLE "Investiment" (
    "id" TEXT NOT NULL,
    "amount" DECIMAL(12,2) NOT NULL,
    "yield" DECIMAL(12,2) NOT NULL,
    "createaAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Investiment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_investimentId_fkey" FOREIGN KEY ("investimentId") REFERENCES "Investiment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Investiment" ADD CONSTRAINT "Investiment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
