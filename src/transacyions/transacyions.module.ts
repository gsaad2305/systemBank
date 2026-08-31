import { Module } from '@nestjs/common';
import { TransacyionsService } from './transacyions.service.js';
import { TransacyionsController } from './transacyions.controller.js';

@Module({
  controllers: [TransacyionsController],
  providers: [TransacyionsService],
})
export class TransacyionsModule {}
