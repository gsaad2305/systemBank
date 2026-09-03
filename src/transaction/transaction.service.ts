import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { DepositDto } from './dto/deposit.dto.js';
import { PrismaService } from '../database/prisma.service.js';
import { TransactionType } from '../generated/prisma/enums.js';
import { WithdralDto} from './dto/withdral.dto.js';
import { BalanceService } from './balance/balance.service.js';
import { TransferDto } from './dto/transfer.dto.js';

@Injectable()
export class TransactionService {
  constructor(private readonly prismaService: PrismaService, private readonly balanceService: BalanceService) {}
  async deposit(depositDto: DepositDto, accountId: string, userId:string,) {
    const account = await this.prismaService.account.findUnique({
      where: {
        id:accountId
      },
    });

    if(!account) throw new NotFoundException("User not found");
    if(account.ownerId !== userId) throw new ForbiddenException("DO you not user");
    if(depositDto.amount > 2000) throw new BadRequestException("Deposits over 2,000 are not valid.");

    return this.prismaService.transaction.create({
      data: {
        type: TransactionType.DEPOSIT,
        amount: depositDto.amount,
        toAccountId: accountId
      },
    });
  }

  async withdral(withdralDto: WithdralDto, accountId: string, userId:string,) {
    const account = await this.prismaService.account.findUnique({
      where: {
        id: accountId,
      }
    });

    if(!account) throw new NotFoundException("User not found");
    const { balance } = await this.balanceService.getBalance(accountId,userId);
    if(balance.lessThan(withdralDto.amount)) throw new BadRequestException('Insuficent value for withdral');
    if(withdralDto.amount > 2000) throw new BadRequestException("Withdral over 2,000 are not valid.");

      return this.prismaService.transaction.create({
        data: {
          type: TransactionType.WITHDRAWAL,
          amount: withdralDto.amount,
          fromAccountId: accountId
        },
      });
  }

async transfer(transferDto: TransferDto,accountId: string,userId: string) {
  const fromAccount = await this.prismaService.account.findUnique({
    where:{
      id: accountId,
    },
  });

  if(!fromAccount) throw new NotFoundException("Account not found");
  if(fromAccount.ownerId !== userId) throw new ForbiddenException("You do not have acess to this account");

  const toAccount = await this.prismaService.account.findUnique({
    where:{
      id: transferDto.toAccountId,
    },
  });

  if(!toAccount) throw new NotFoundException("Destianation not found");
  if(fromAccount.ownerId === toAccount.ownerId &&fromAccount.type === toAccount.type) throw new BadRequestException("Cannot transfer to an account of same type");

  const { balance } = await this.balanceService.getBalance(accountId, userId);
  if(balance.lessThan(transferDto.amount)) throw new BadRequestException('Insuficent value for withdral');
  if(transferDto.amount > 2000) throw new BadRequestException("Deposits over 2,000 are not valid.");


  return this.prismaService.transaction.create({
    data: {
      type: TransactionType.TRANSFER,
      amount: transferDto.amount,
      fromAccountId: accountId,
      toAccountId: transferDto.toAccountId
    },
  });
}

}
