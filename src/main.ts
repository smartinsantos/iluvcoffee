import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from 'src/common/filters/http-exception/http-exception.filter';
import { WrapResponseInterceptor } from 'src/common/interceptors/wrap-response/wrap-response.interceptor';
import { TimeoutInterceptor } from 'src/common/interceptors/timeout/timeout.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // global validation pipe
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

  // global http exception filter
  app.useGlobalFilters(new HttpExceptionFilter());

  // global interceptor to wrap responses
  app.useGlobalInterceptors(
    new WrapResponseInterceptor(),
    new TimeoutInterceptor(),
  );

  // Swagger documentation config
  const options = new DocumentBuilder()
    .setTitle('Iluvcoffee')
    .setDescription('Coffee application')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}

bootstrap();
