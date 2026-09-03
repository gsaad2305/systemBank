import { IsNumber, IsPositive, IsString } from "class-validator";

export class TransferDto {
  @IsNumber()
  @IsPositive()
  amount: number;

  @IsString()
  toAccountId: string;
}
