import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AcountService } from './acount.service.js';
import { CreateAcountDto } from './dto/create-acount.dto.js';
import { UpdateAcountDto } from './dto/update-acount.dto.js';

@Controller('acount')
export class AcountController {
  constructor(private readonly acountService: AcountService) {}

  @Post()
  create(@Body() createAcountDto: CreateAcountDto) {
    return this.acountService.create(createAcountDto);
  }

  @Get()
  findAll() {
    return this.acountService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.acountService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAcountDto: UpdateAcountDto) {
    return this.acountService.update(+id, updateAcountDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.acountService.remove(+id);
  }
}
