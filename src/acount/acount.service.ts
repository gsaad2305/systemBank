import { Injectable } from '@nestjs/common';
import { CreateAcountDto } from './dto/create-acount.dto.js';
import { UpdateAcountDto } from './dto/update-acount.dto.js';

@Injectable()
export class AcountService {
  create(createAcountDto: CreateAcountDto) {
    return 'This action adds a new acount';
  }

  findAll() {
    return `This action returns all acount`;
  }

  findOne(id: number) {
    return `This action returns a #${id} acount`;
  }

  update(id: number, updateAcountDto: UpdateAcountDto) {
    return `This action updates a #${id} acount`;
  }

  remove(id: number) {
    return `This action removes a #${id} acount`;
  }
}
