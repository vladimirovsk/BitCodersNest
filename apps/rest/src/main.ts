import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe, Logger } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { getMongoString } from '../../../configs/mongo.config';

async function bootstrap() {
  const logger = new Logger('MAIN');

  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });

  //const workDir = process.cwd();
  //const environment = process.env.NODE_ENV || 'develop';

  const configService = app.get(ConfigService);

  ConfigModule.forRoot({
    // envFilePath: `.env.${environment}`,
    // envFilePath: '.env',
    isGlobal: true,
  });

  logger.debug(`USE MONGO_HOST: ${configService.get('MONGO_HOST')}`);

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix(`/api/${configService.get('VERSION') ?? 'v1'}`);

  const configDocument = new DocumentBuilder()
    .setTitle('REST BITCODERS')
    .setDescription('The rest API description')
    .setVersion('0.2')
    .addTag('rate')
    .build();

  const document = SwaggerModule.createDocument(app, configDocument);
  SwaggerModule.setup('doc', app, document);

  await app.listen(+configService.get('API_PORT') ?? 3000, async () => {
    logger.log(`Application is running on: ${await app.getUrl()}`);
  });
}
bootstrap();
