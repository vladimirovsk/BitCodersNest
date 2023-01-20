import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe, Logger } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const logger = new Logger('MAIN');

  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true
  });

  const workDir = process.cwd();
  const configService = app.get(ConfigService);

  const environment = process.env.NODE_ENV || 'develop';
  ConfigModule.forRoot({
    // envFilePath: `.env.${environment}`,
    envFilePath: '.env',
    isGlobal: true,
  });

  logger.debug(
    'mongodb://'+
    configService.get('MONGO_USER') + ':'+
    configService.get('MONGO_PASSWORD')+ '@'+
    configService.get('MONGO_HOST')+':'+configService.get('MONGO_PORT')
    +'/'+
    configService.get('MONGO_DB')
  );
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
