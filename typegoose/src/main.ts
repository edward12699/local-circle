import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module.js';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    // new ValidationPipe({
    //   transform: true,
    //   whitelist: true,
    //   forbidNonWhitelisted: true,
    //   skipMissingProperties: false,
    //   forbidUnknownValues: false,// 据说是个库的bug，先设为false,https://github.com/typestack/class-validator/issues/1873
    // }),
  );

  await app.listen(3000);
}

// eslint-disable-next-line no-void
void bootstrap();
