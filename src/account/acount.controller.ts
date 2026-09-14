import { Controller, Post, Body, UseGuards, Req, Get, Param, Delete } from '@nestjs/common';
import { AcountService } from './acount.service.js';
import { CreateAcountDto } from './dto/create-acount.dto.js';
import { AuthGuard } from '@nestjs/passport';
import type { AuthenticatedRequest } from '../auth/types/autenticated-request.js';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
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
  getAccount(@Req() request:AuthenticatedRequest){
    return this.acountService.getAccount(request.user.id);
  }
  @UseGuards(AuthGuard('jwt'))
  @Delete(":accountId")
  deleteAccount(@Param('accountId') accountId: string,@Req() request:AuthenticatedRequest){
    return this.acountService.deleteAccount(request.user.id, accountId);
  }
}
