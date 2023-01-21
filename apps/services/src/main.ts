import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigModule, ConfigService } from '@nestjs/config';

async function bootstrap() {

  const logger = new Logger('MAIN');

  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true
  });

  const configService = app.get(ConfigService);
  ConfigModule.forRoot({ isGlobal: true, envFilePath: './env' });

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix(`/api/${configService.get('VERSION') ?? 'v1'}`);

  await app.listen( 3050, async () => {
    logger.log(`Application is running on: ${await app.getUrl()}`);
  });
}

bootstrap();
