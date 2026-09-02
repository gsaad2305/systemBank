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


@Module({
  imports: [
  TransactionModule,
  UsersModule,
  AcountModule,
  AuthModule,
  HashingModule,
PrismaModule,
ConfigModule.forRoot({
  isGlobal: true,
  load: [jwtConfig]
})],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
