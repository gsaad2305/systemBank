import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TransacyionsService } from './transacyions.service.js';
import { CreateTransacyionDto } from './dto/create-transacyion.dto.js';
import { UpdateTransacyionDto } from './dto/update-transacyion.dto.js';

@Controller('transacyions')
export class TransacyionsController {
  constructor(private readonly transacyionsService: TransacyionsService) {}

  @Post()
  create(@Body() createTransacyionDto: CreateTransacyionDto) {
    return this.transacyionsService.create(createTransacyionDto);
  }

  @Get()
  findAll() {
    return this.transacyionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transacyionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTransacyionDto: UpdateTransacyionDto) {
    return this.transacyionsService.update(+id, updateTransacyionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transacyionsService.remove(+id);
  }
}
