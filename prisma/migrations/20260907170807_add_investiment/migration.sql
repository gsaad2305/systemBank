-- CreateTable
CREATE TABLE "Investiments" (
    "id" TEXT NOT NULL,
    "amount" DECIMAL(12,2) NOT NULL,
    "yield" DECIMAL(12,2) NOT NULL,
    "createaAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Investiments_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Investiments" ADD CONSTRAINT "Investiments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
