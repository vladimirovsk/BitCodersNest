import { forwardRef, Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Context, deunionize, Telegraf } from 'telegraf';
import {
	Ctx,
	Hears,
	Help, InjectBot,
	Action,
	On,
	Start,
	Update,
	Command
} from 'nestjs-telegraf';
import { PortCheckerService } from '../portChecker/port-checker.service';

@Update()
@Injectable()
export class TelegramBotService  {
	private logger = new Logger(TelegramBotService.name);
	private chatId = '-4040356453';

	constructor(
		@InjectBot() private bot: Telegraf<Context>,
		@Inject(forwardRef(() => PortCheckerService))
		private portCheckerService: PortCheckerService,
	) {
	}
	async sendMessage(message: string, chatId:string ){
		this.bot.telegram.sendMessage(chatId, message).catch(err=>{
		this.logger.debug(chatId, message, err.message);
		throw new Error(err.message);
		});
	}

	@Command( 'status')
	async status(ctx: Context) {
		await this.portCheckerService.getStatusServersDto(true)
			.catch((e) => this.logger.error(`Error get status servers ${e.message}`))
		this.logger.debug('Send status')
	}

	@Help()
	async helpCommand(ctx: Context) {
		await ctx.reply('List my commands....');
		this.logger.debug('Send List my commands')
	}

	@Start()
	async start(@Ctx() ctx : Context){
		await ctx.reply(`Hi! i'm telegram bot company Bitcoders.`);
		this.logger.debug('Send start message')
	}

	@On('text')
	async hearsAll(ctx: Context) {
		const text = deunionize(ctx.message)?.text;
		await ctx.reply(`YOU WRITE ME ${JSON.stringify(text, null, 2)}`);
		this.logger.debug('Reply text message')
	}

}