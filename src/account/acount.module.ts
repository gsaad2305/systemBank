import { Module } from '@nestjs/common';
import { AcountService } from './acount.service.js';
import { AcountController } from './acount.controller.js';
import { PrismaModule } from '../database/prisma.module.js';
import { AuthModule } from '../auth/auth.module.js';

@Module({
  imports:[PrismaModule, AuthModule],
  controllers: [AcountController],
  providers: [AcountService],
})
export class AcountModule {}
