import { Module } from "@nestjs/common";
import { PrismaModule } from "../../database/prisma.module.js";
import { BalanceService } from "./balance.service.js";
@Module({
  imports:[PrismaModule,],
  providers: [BalanceService],
  exports:[BalanceService]
})
export class BalanceModule {}
