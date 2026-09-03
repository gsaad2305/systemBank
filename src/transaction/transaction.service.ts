import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { DepositDto } from './dto/deposit.dto.js';
import { PrismaService } from '../database/prisma.service.js';
import { TransactionType } from '../generated/prisma/enums.js';
import { SacarDto} from './dto/sacar.dto.js';
import { BalanceService } from './balance/balance.service.js';

@Injectable()
export class TransactionService {
  constructor(private readonly prismaService: PrismaService, private readonly balanceService: BalanceService) {}
  async deposit(depositDto: DepositDto, accountId: string, userId:string,) {
    const account = await this.prismaService.account.findUnique({ where: {id:accountId}});
    if(!account) throw new NotFoundException("User not found");
    if(account.ownerId !== userId) throw new ForbiddenException("DO you not user");
    return this.prismaService.transaction.create({
      data: {
        type: TransactionType.DEPOSIT,
        amount: depositDto.amount,
        toAccountId: accountId
      }
    })
  }

  async withdral(sacarDto: SacarDto, accountId: string, userId:string,) {
    const account = await this.prismaService.account.findUnique({
      where: {
        id: accountId,
      }
    });
    if(!account) throw new NotFoundException("User not found")
    const { balance } = await this.balanceService.getBalance(accountId,userId)
    if(balance.lessThan(sacarDto.amount)) throw new BadRequestException('Insuficent value for withdral')
      return this.prismaService.transaction.create({
        data: {
          type: TransactionType.WITHDRAWAL,
          amount: sacarDto.amount,
          fromAccountId: accountId
        }
      })
  }
}
