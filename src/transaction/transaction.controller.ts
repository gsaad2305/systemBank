import { Controller, Post, Body, Param, UseGuards, Req } from '@nestjs/common';
import { TransactionService } from './transaction.service.js';
import { AuthGuard } from '@nestjs/passport';
import { DepositDto } from './dto/deposit.dto.js';
import type { AuthenticatedRequest } from '../auth/types/autenticated-request.js';
import { SacarDto } from './dto/sacar.dto.js';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

    @UseGuards(AuthGuard('jwt'))
    @Post(':accountId/deposit')
    deposit(@Param('accountId') accountId:"string", @Body() depositDto: DepositDto, @Req() request: AuthenticatedRequest) {
      return this.transactionService.deposit(depositDto,accountId, request.user.id);
    }
    @UseGuards(AuthGuard('jwt'))
    @Post(':accountId/sacar')
    sacar(@Param('accountId') accountId:"string", @Body() sacarDto: SacarDto, @Req() request: AuthenticatedRequest) {
      return this.transactionService.withdral(sacarDto,accountId, request.user.id);
    }

}
