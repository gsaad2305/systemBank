import { Controller, Post, Body, Param, UseGuards, Req, Get } from '@nestjs/common';
import { TransactionService } from './transaction.service.js';
import { AuthGuard } from '@nestjs/passport';
import { DepositDto } from './dto/deposit.dto.js';
import type { AuthenticatedRequest } from '../auth/types/autenticated-request.js';
import { WithdralDto } from './dto/withdral.dto.js';
import { TransferDto } from './dto/transfer.dto.js';

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
    sacar(@Param('accountId') accountId:"string", @Body() withdralDto: WithdralDto, @Req() request: AuthenticatedRequest) {
      return this.transactionService.withdral(withdralDto,accountId, request.user.id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post(":accountId/transfer")
    transfer(@Param('accountId') accountId:"string",@Req() request: AuthenticatedRequest, @Body() transferDto: TransferDto){
      return this.transactionService.transfer(transferDto,accountId,request.user.id);
    }

   @UseGuards(AuthGuard('jwt'))
   @Get(":accountId/history")
   getHistory(@Param('accountId') accountId:string, @Req() request: AuthenticatedRequest){
    return this.transactionService.getHistory(accountId, request.user.id)
   }
}
