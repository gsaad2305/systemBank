import { IsNumber, IsPositive } from "class-validator";

export class TransfererDto {
  @IsPositive()
  @IsNumber()
  ammount: number;
  
}
