import { Injectable } from '@nestjs/common';
import { CreateTransacyionDto } from './dto/create-transacyion.dto.js';
import { UpdateTransacyionDto } from './dto/update-transacyion.dto.js';

@Injectable()
export class TransacyionsService {
  create(createTransacyionDto: CreateTransacyionDto) {
    return 'This action adds a new transacyion';
  }

  findAll() {
    return `This action returns all transacyions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} transacyion`;
  }

  update(id: number, updateTransacyionDto: UpdateTransacyionDto) {
    return `This action updates a #${id} transacyion`;
  }

  remove(id: number) {
    return `This action removes a #${id} transacyion`;
  }
}
