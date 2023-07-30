import { Module } from '@nestjs/common';
import { PortCheckerService } from './port-checker.service';
import { PortCheckerController } from './port-checker.controller';
import { ScheduleModule } from '@nestjs/schedule';
import { DiscordModule } from '@discord-nestjs/core';

@Module({
  imports: [
    ScheduleModule.forRoot(),
  ],

  providers: [PortCheckerService],
  controllers: [PortCheckerController],
  exports: [],
})
export class PortCheckerModule {}
