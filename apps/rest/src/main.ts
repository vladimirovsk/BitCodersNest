import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppLoggerService } from '../../../middleware/app-logger/app-logger.service';
import { join } from 'path';

async function bootstrap() {
  const logger = new Logger('MAIN');

  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });

  //const workDir = process.cwd();
  //const environment = process.env.NODE_ENV || 'develop';

  const configService = app.get(ConfigService);

  logger.debug(`USE MONGO_HOST: ${configService.get('MONGO_HOST')}`);

  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    optionsSuccessStatus: 200,
    preflightContinue: false,
  });
  app.useGlobalPipes(new ValidationPipe());
  app.useLogger(app.get(AppLoggerService));

  const configDocument = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('REST ITCODER')
    .setDescription('The rest API description')
    .setVersion('0.3.1')
    .addTag('Auth')
    .build();

  app.useStaticAssets(join(process.cwd(), '/public/client'), {
    prefix: `/client`,
  });

  app.setGlobalPrefix(`/api/${configService.get('VERSION') ?? 'v1'}`);

  const document = SwaggerModule.createDocument(app, configDocument, {
     ignoreGlobalPrefix: true,
  });

  SwaggerModule.setup('doc', app, document, {
     swaggerUrl: 'https://api-doc.it-coder.com',
     url: 'https://api-rest.it-coder.com',
  });

  await app.listen(+configService.get('API_PORT') ?? 3000, async () => {
    logger.log(`Application is running on: ${await app.getUrl()}`);
  });
}
bootstrap();
