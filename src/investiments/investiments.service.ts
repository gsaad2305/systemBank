import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InvestimentDto } from './dto/investiment.dto.js';
import { PrismaService } from '../database/prisma.service.js';
import { BalanceService } from '../transaction/balance/balance.service.js';
import { TransactionType } from '../generated/prisma/enums.js';
import { Prisma } from '../generated/prisma/client.js';
import { RedemptionDto } from './dto/redemption.dto.js';

@Injectable()
export class InvestimentsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly balanceService: BalanceService
  ){}

  async getTotalInvested(accountId: string, userId: string) {
    const account = await this.prismaService.account.findUnique({
      where: {
        id: accountId,
      },
    });

    if (!account) {
      throw new NotFoundException('Account not found');
    }

    if (account.ownerId !== userId) {
      throw new ForbiddenException('You do not have access to this account');
    }

    const result = await this.prismaService.transaction.aggregate({
      where: {
        type: TransactionType.INVESTIMENT,
        fromAccountId: accountId,
      },
      _sum: {
        amount: true,
      },
    });

    return {
      investedAmount: result._sum.amount ?? new Prisma.Decimal(0),
    };
  }

  async investiment(investimentDto: InvestimentDto, accountId: string, userId: string) {
    const account = await this.prismaService.account.findUnique({
      where:{
        id: accountId
      },
    });

    if(!account) throw new NotFoundException("Account not found")
    if(account.ownerId !== userId) throw new ForbiddenException("Do you not user");
    const {balance} = await this.balanceService.getBalance(accountId, userId);

    if(balance.lessThan(investimentDto.ammount)){
      throw new BadRequestException("Insuficient balance")
    }

    const result = await this.prismaService.$transaction(async(tx)=>{
      const investiment = await tx.investiment.create({
        data:{
          amount: investimentDto.ammount,
          yield:0,
          userId,
        }
      });

      const transaction = await tx.transaction.create({
        data:{
          type: TransactionType.INVESTIMENT,
          amount: investimentDto.ammount,
          fromAccountId: accountId,
          investimentId: investiment.id
        }
      })

      return {
        investiment,
        transaction
      };
    });

    return result;
  }
  async redemption(redemptionDto:RedemptionDto,accountId:string, userId:string){
    const account = await this.prismaService.account.findUnique({
      where:{
        id: accountId
      },
    });

    if(!account) throw new NotFoundException("Account not found")
    if(account.ownerId !== userId) throw new ForbiddenException("Do you not user");
    const {balance} = await this.balanceService.getBalance(accountId, userId);

    if(balance.lessThan(redemptionDto.ammount)){
      throw new BadRequestException("Insuficient balance")
    }

    const result = await this.prismaService.$transaction(async(tx)=>{
      const redemption = await tx.investiment.create({
        data:{
          amount: redemptionDto.ammount,
          userId,
          yield:0,
        }
      });

      const transaction = await tx.transaction.create({
        data:{
          type: TransactionType.REDEMPTION,
          amount: redemptionDto.ammount,
          fromAccountId: accountId,
          investimentId: redemption.id
        }
      })

      return {
        redemption,
        transaction
      };
    });
  }
}
