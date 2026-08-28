import { Module } from '@nestjs/common';
import { AcountService } from './acount.service.js';
import { AcountController } from './acount.controller.js';

@Module({
  controllers: [AcountController],
  providers: [AcountService],
})
export class AcountModule {}
