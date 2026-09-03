import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service.js';
import { TransactionController } from './transaction.controller.js';
import {  PrismaModule } from '../database/prisma.module.js';
import { HashingModule } from '../common/hashing/hashing.module.js';
import { BalanceModule } from './balance/balance.module.js';

@Module({
  imports:[PrismaModule, HashingModule, BalanceModule],
  controllers: [TransactionController],
  providers: [TransactionService],
})
export class TransactionModule {}
