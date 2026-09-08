import { BadRequestException, ConflictException, ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateAcountDto } from './dto/create-acount.dto.js';
import { PrismaService } from '../database/prisma.service.js';
import { randomInt } from 'node:crypto';
import { Prisma } from '../generated/prisma/client.js';

@Injectable()
export class AcountService {
  constructor(private readonly prismaService: PrismaService) {}

  async createAccount(createAccountDto: CreateAcountDto, ownerId: string) {
    const user = await this.prismaService.user.findUnique({
      where:{
        id: ownerId,
      },
    });

    if(!user) throw new NotFoundException("User not found");
    const accountExists = await this.prismaService.account.findFirst({
      where:{
        ownerId,
        type: createAccountDto.type,
      },
    });

    if(accountExists) throw new ConflictException("Account type already exists");

    const number = randomInt(10000000, 100000000).toString()
    return await this.prismaService.account.create({
      data: {
        number,
        type: createAccountDto.type,
        ownerId,
      },
    });

  }

  async getBalance(accountId:string, userId: string){
    const account = await this.prismaService.account.findUnique({
      where:{
        id:accountId,
      },
    });

  if(!account) throw new ForbiddenException("Account not found");
  if(account.ownerId !== userId) throw new ForbiddenException("User unauthorized");

  const transactions = await this.prismaService.transaction.findMany({
    where: {
      OR: [
        {
          fromAccountId: accountId,
        },
        {
          toAccountId: accountId,
        },
      ],
    },
  });

  const balance = transactions.reduce((acc,transaction) => {
    if(transaction.toAccountId === accountId){
      return acc.plus(transaction.amount);
    }
    return acc.minus(transaction.amount);
  },new Prisma.Decimal(0));
  return {
    balance,
  };

  }

  async getAccount( accountId: string){
    return await this.prismaService.account.findMany({
      where: {
        ownerId: accountId
      },
    });
  }
  async deleteAccount(userId: string, accountId: string){
    const removeAccountId = await this.prismaService.account.findUnique({
      where: {
        id: accountId
      },
    });
    if(!removeAccountId) throw new NotFoundException("User not found");
    if(removeAccountId.ownerId !== userId) throw new BadRequestException("Do you not authorized")

    return this.prismaService.account.delete({where:{id: accountId}})
  }
}
