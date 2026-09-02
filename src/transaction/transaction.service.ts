import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { DepositDto } from './dto/deposit.dto.js';
import { PrismaService } from '../database/prisma.service.js';
import { accessSync } from 'fs';
import { TransactionType } from '../generated/prisma/enums.js';
import { TransfererDto } from './dto/transferer.dto.js';

@Injectable()
export class TransactionService {
  constructor(private readonly prismaService: PrismaService) {}
  async deposit(depositDto: DepositDto, accountId: string, userId:string,) {
    const account = await this.prismaService.account.findUnique({
      where:{
        id: accountId,
      },
    })
    ;
    if (!account) throw new NotFoundException("User not found");
    if (account.ownerId !== userId) throw new ForbiddenException("you do not have acess to this account");

    return this.prismaService.transaction.create({
      data: {
        type: TransactionType.DEPOSIT,
        amount: depositDto.amount,
        toAccountId: accountId,
      }
    });
  }

  async sacar(transferirDto:TransfererDto){

  }
}
