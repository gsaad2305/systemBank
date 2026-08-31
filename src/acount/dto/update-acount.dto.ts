import { PartialType } from '@nestjs/mapped-types';
import { CreateAcountDto } from './create-acount.dto.js';

export class UpdateAcountDto extends PartialType(CreateAcountDto) {}
