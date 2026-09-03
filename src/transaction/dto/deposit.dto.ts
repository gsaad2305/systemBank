import { IsNumber, IsPositive, IsUUID } from "class-validator";

export class DepositDto {

  @IsNumber()
  @IsPositive()
  amount: number;
}
