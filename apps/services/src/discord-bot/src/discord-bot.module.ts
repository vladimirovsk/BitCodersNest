import { Module } from '@nestjs/common';
import { DiscordBotController } from './discord-bot.controller';
import { DiscordBotService } from './discord-bot.service';
import { RMQModule } from 'nestjs-rmq';
import { getRMQConfig } from '../../../configs/rmq.config';

@Module({
  imports: [
    RMQModule.forRootAsync(getRMQConfig()),
  ],
  controllers: [DiscordBotController],
  providers: [DiscordBotService],
})
export class DiscordBotModule {}
