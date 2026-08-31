import { Controller, Post, Body, UseGuards, Req, Get, Param } from '@nestjs/common';
import { AcountService } from './acount.service.js';
import { CreateAcountDto } from './dto/create-acount.dto.js';
import { AuthGuard } from '@nestjs/passport';
import type { AuthenticatedRequest } from '../auth/types/autenticated-request.js';

@Controller('account')
export class AcountController {
  constructor(private readonly acountService: AcountService) {}
  @UseGuards(AuthGuard('jwt'))
  @Post()
  createAccount(@Body() createAcountDto: CreateAcountDto, @Req() request: AuthenticatedRequest) {
    return this.acountService.createAccount(createAcountDto, request.user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(":accountId/balance")
  getBalance(@Param('accountId') accountId: string, @Req() request: AuthenticatedRequest){
    return this.acountService.getBalance(accountId, request.user.id)
  }
  
  @UseGuards(AuthGuard('jwt'))
  @Get()
  getAccount(){
    return this.acountService.getAccont();
  }
}
