import { IsEnum } from "class-validator";
import { TransactionType } from "../../generated/prisma/enums.js";

export class CreateTransactionDto {
  @IsEnum(TransactionType)
  transaction: TransactionType;
}
