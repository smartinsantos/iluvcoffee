import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // this will remove all properties not listed in the dtos
      forbidNonWhitelisted: true, // requests will respond with an error if a property is not listed in the dtos
      transform: true, // this will create instances of dtos on every request Body, and will try to cast any Params primitives to the specified their expected type
      transformOptions: {
        enableImplicitConversion: true, // same as @Type() functionality
      },
    }),
  );
  await app.listen(3000);
}

bootstrap();
