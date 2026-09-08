import { IsNumber, IsPositive } from "class-validator";
import { InvestimentDto } from "./investiment.dto.js";

export class RedemptionDto {
    @IsNumber()
    @IsPositive()
    amount: number;

}
