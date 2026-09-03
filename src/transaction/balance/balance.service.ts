import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../database/prisma.service.js";
import { Prisma } from "../../generated/prisma/client.js";

@Injectable()
export class  BalanceService{
  constructor(private readonly prismaService: PrismaService){}
async getBalance(accountId: string, userId: string) {
  const account = await this.prismaService.account.findUnique({
    where: {
      id: accountId,
    },
  });

  if (!account) {
    throw new NotFoundException('Account not found');
  }

  if (account.ownerId !== userId) {
    throw new ForbiddenException(
      'You do not have access to this account',
    );
  }

  const transactions =
    await this.prismaService.transaction.findMany({
      where: {
        OR: [
          { fromAccountId: accountId },
          { toAccountId: accountId },
        ],
      },
      select: {
        amount: true,
        fromAccountId: true,
        toAccountId: true,
      },
    });

  const balance = transactions.reduce(
    (balance, transaction) => {
      if (transaction.toAccountId === accountId) {
        return balance.plus(transaction.amount);
      }

      if (transaction.fromAccountId === accountId) {
        return balance.minus(transaction.amount);
      }

      return balance;
    },
    new Prisma.Decimal(0),
  );

  return {
    balance,
  };
}
}
