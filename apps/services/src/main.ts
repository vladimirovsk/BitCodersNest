import { NestFactory } from '@nestjs/core';
import { ServicesModule } from './services.module';

async function bootstrap() {
  const app = await NestFactory.create(ServicesModule);
  await app.listen(3000);
}
bootstrap();
