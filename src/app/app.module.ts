import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { UsersModule } from '../users/users.module.js';
import { AcountModule } from '../account/acount.module.js';
import { AuthModule } from '../auth/auth.module.js';
import { PrismaModule } from '../database/prisma.module.js';
import { ConfigModule } from '@nestjs/config';
import jwtConfig from '../auth/config/jwt.config.js';
import { HashingModule } from '../common/hashing/hashing.module.js';
import { TransactionModule } from '../transaction/transaction.module.js';
import { BalanceModule } from '../transaction/balance/balance.module.js';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler'
import { APP_GUARD } from '@nestjs/core';
import { InvestimentsModule } from '../investiments/investiments.module.js';

@Module({
  imports: [
  InvestimentsModule,
  TransactionModule,
  UsersModule,
  AcountModule,
  AuthModule,
  HashingModule,
  BalanceModule,
  PrismaModule,
  ConfigModule.forRoot({
  isGlobal: true,
  load: [jwtConfig]
}),
 ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 10000,
          limit: 10,
          blockDuration: 5000,
        },
      ],
    }),
],
  controllers: [AppController],
  providers: [AppService,
{
  provide: APP_GUARD,
  useClass: ThrottlerGuard
}
],
})
export class AppModule {}
