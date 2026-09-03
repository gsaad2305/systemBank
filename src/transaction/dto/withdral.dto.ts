import { IsNumber, IsPositive } from "class-validator";

export class WithdralDto {
  @IsPositive()
  @IsNumber()
  amount: number;

}
