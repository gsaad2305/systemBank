import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { UsersModule } from '../users/users.module.js';
import { AcountModule } from '../acount/acount.module.js';
import { AuthModule } from '../auth/auth.module.js';
import { PrismaModule } from '../database/prisma.module.js';


@Module({
  imports: [
  UsersModule,
  AcountModule,
  AuthModule,
PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
