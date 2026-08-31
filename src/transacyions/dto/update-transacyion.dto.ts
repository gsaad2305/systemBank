import { PartialType } from '@nestjs/mapped-types';
import { CreateTransacyionDto } from './create-transacyion.dto.js';

export class UpdateTransacyionDto extends PartialType(CreateTransacyionDto) {}
