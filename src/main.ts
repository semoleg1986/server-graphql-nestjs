import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

const port = process.env.PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: [
      'http://localhost:3001',
      'https://bucolic-smakager-23e6b4.netlify.app',
    ],
    credentials: true,
  });
  await app.listen(port);
}
bootstrap();
