import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Movie-catalog-api - docs')
    .setDescription(
      'documentação de uma api de catalogo de filmes com autenticação, para testar os endpoints de movies deve ter um usuario autenticado',
    )
    .setVersion('1.0')
    .addServer('http://localhost:3000')
    .addTag('auth')
    .addTag('users')
    .addTag('movies')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
