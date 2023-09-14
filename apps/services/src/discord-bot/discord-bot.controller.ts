import { Controller, Logger } from '@nestjs/common';
import { RMQRoute, RMQService } from 'nestjs-rmq';
import { rmqTopics } from '../../../../constant/rabbitmq.constants';
import { DiscordBotClient } from './discord-bot.client';
import { DiscordBotMessageDto } from './dto/discord-bot-message.dto';

@Controller()
export class DiscordBotController {
	private logger = new Logger(DiscordBotController.name);
	constructor(
		private readonly rmqService: RMQService,
		private readonly discordBotClient : DiscordBotClient
	) {
	}

	@RMQRoute(rmqTopics.discordSendMessage, { manualAck: true })
	async discordSendMessage(dto: DiscordBotMessageDto) {
		await this.discordBotClient.sendMessage(dto.channel, dto.message);
	}

}