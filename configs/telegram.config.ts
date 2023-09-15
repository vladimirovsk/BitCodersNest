import {ConfigService} from '@nestjs/config';
import { ITelegramOptions } from '../apps/services/src/telegram-bot/telegram-bot.interface';


export const getTelegramConfig =  (configService:ConfigService): ITelegramOptions => {
	const token = configService.get('TELEGRAM_BOT_TOKEN');
	if (!token) {
		throw new Error('TELEGRAM_BOT_TOKEN not found');
	}
	return {
		chatId: configService.get('TELEGRAM_GROUP_ID') ?? '',
		token: token
	};
};