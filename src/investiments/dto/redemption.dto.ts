import { IsNumber, IsPositive } from "class-validator";

export class RedemptionDto {
    @IsNumber()
    @IsPositive()
    amount: number;

}
