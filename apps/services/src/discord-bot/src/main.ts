import { NestFactory } from '@nestjs/core';
import { DiscordBotModule } from './discord-bot.module';

async function bootstrap() {
  const app = await NestFactory.create(DiscordBotModule);
  await app.listen(3000);
}
bootstrap();
