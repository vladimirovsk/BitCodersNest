import { Controller, forwardRef, Inject, Logger } from '@nestjs/common';
import { PortCheckerService } from './port-checker.service';
import { Interval } from '@nestjs/schedule';
import { TelegramBotService } from '../telegram-bot/telegram-bot.service';

@Controller('port-checker')
export class PortCheckerController {
  private logger = new Logger(PortCheckerController.name)
  constructor(
    private readonly portChecker: PortCheckerService,
  ) {
  }

 @Interval('check ',60*1000)
 private async _startPortChecker() {
    this.portChecker.getStatusServers();
 }
}