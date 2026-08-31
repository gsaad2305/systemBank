import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { AccountType } from '../../generated/prisma/enums.js';

export class CreateAcountDto {
  @IsEnum(AccountType)
  type: AccountType;
}
