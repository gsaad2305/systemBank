import 'dotenv/config';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module.js';
import helmet from 'helmet';
import {SwaggerModule, DocumentBuilder} from "@nestjs/swagger"
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  if(process.env.NODE_ENV === "production"){
    app.use(helmet());
  }
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const config = new DocumentBuilder()
  .setTitle('API systemBank')
  .setDescription('systemBank')
  .setVersion('1.0')
  .addTag('bank')
  .addBearerAuth()
  .build()

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('bank', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();
