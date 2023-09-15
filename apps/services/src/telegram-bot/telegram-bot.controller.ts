import { Controller, forwardRef, Get, Inject, Logger } from '@nestjs/common';
import { TelegramBotService } from './telegram-bot.service';
import { Command, Ctx, Help, InjectBot, On, Start, Update } from 'nestjs-telegraf';
import { Context, deunionize, Telegraf } from 'telegraf';
import { PortCheckerService } from '../portChecker/port-checker.service';

@Update()
@Controller()
export class TelegramBotController {
	private logger = new Logger(TelegramBotController.name)
	constructor(

	) {}
}
