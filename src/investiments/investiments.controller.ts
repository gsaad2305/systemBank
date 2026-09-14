import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { InvestimentsService } from './investiments.service.js';
import { InvestimentDto } from './dto/investiment.dto.js';
import { AuthGuard } from '@nestjs/passport';
import type { AuthenticatedRequest } from '../auth/types/autenticated-request.js';
import { RedemptionDto } from './dto/redemption.dto.js';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('investiments')
export class InvestimentsController {
  constructor(private readonly investimentsService: InvestimentsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get(':accountId')
  getTotalInvested(@Param('accountId') accountId: string, @Req() request: AuthenticatedRequest) {
    return this.investimentsService.getTotalInvested(accountId, request.user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post(":accountId/invested")
  createInvestiments(@Param("accountId") accountId: string,@Body() investimentDto: InvestimentDto,@Req() request: AuthenticatedRequest, ) {
    return this.investimentsService.investiment(investimentDto, accountId, request.user.id);
  }
   @UseGuards(AuthGuard('jwt'))
  @Post(":accountId/redemption")
  redemption(@Param("accountId") accountId: string,@Body() redemptionDto: RedemptionDto,@Req() request: AuthenticatedRequest, ) {
    return this.investimentsService.redemption(redemptionDto, accountId, request.user.id);
  }
}
