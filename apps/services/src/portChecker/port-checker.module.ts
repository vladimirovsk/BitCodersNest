import { forwardRef, Module } from '@nestjs/common';
import { PortCheckerService } from './port-checker.service';
import { PortCheckerController } from './port-checker.controller';
import { ScheduleModule } from '@nestjs/schedule';
import { DiscordModule } from '@discord-nestjs/core';
import { TelegramBotModule } from '../telegram-bot/telegram-bot.module';

@Module({
  imports: [
    forwardRef(()=>TelegramBotModule),
    ScheduleModule.forRoot(),
  ],

  providers: [PortCheckerService],
  controllers: [PortCheckerController],
  exports: [PortCheckerService],
})
export class PortCheckerModule {}
