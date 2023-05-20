import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { join } from 'path';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const logger = new Logger('MAIN');
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });

  const configService = app.get(ConfigService);
  ConfigModule.forRoot({ isGlobal: true });
  app.enableCors();
  app.useLogger(logger);
  app.useGlobalPipes(new ValidationPipe());

  app.useStaticAssets(join(process.cwd(), '/public/socket'), {
    prefix: `/socket`,
  });

  app.setGlobalPrefix(`/api/${configService.get('VERSION') ?? 'v1'}`);

  app.useWebSocketAdapter(new IoAdapter(app));
  // await app.connectMicroservice<MicroserviceOptions>(grpcClientOptions);

  await app
    .startAllMicroservices()
    .then(() => logger.debug('Start Microservices'))
    .catch((err: Function) => logger.error('Error start Microservices', err));

  const config = new DocumentBuilder()
    .setTitle('REST Rate')
    .setDescription('The rest API description')
    .setVersion('0.2')
    .addTag('rate')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);

  await app.listen(+configService.get('API_SOCK') ?? 8000, async () => {
    logger.log(`Application is running on: ${await app.getUrl()}`);
  });
}

bootstrap();
