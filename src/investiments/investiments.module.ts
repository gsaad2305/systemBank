import { Module } from '@nestjs/common';
import { InvestimentsService } from './investiments.service.js';
import { InvestimentsController } from './investiments.controller.js';
import { PrismaModule } from '../database/prisma.module.js';
import { BalanceModule } from '../transaction/balance/balance.module.js';

@Module({
   imports:[PrismaModule, BalanceModule],
  controllers: [InvestimentsController],
  providers: [InvestimentsService],
})
export class InvestimentsModule {}
