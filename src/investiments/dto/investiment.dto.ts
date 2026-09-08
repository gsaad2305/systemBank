import { IsNumber, IsPositive } from "class-validator";

export class InvestimentDto {
  @IsPositive()
  @IsNumber()
  ammount: number;
}
