import { IsNumber, IsPositive } from "class-validator";

export class SacarDto {
  @IsPositive()
  @IsNumber()
  amount: number;

}
