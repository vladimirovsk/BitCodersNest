import { forwardRef, Module } from '@nestjs/common';
import { TelegramBotService } from './telegram-bot.service';
import { TelegrafModule } from 'nestjs-telegraf';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PortCheckerModule } from '../portChecker/port-checker.module';
import { TelegramBotController } from './telegram-bot.controller';

@Module({
	imports:[

		TelegrafModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: (configService: ConfigService) => ({
				token: <string>configService.get<string>('TELEGRAM_BOT_TOKEN'),

			}),
			inject: [ConfigService],
		}),
		forwardRef(()=>PortCheckerModule)
	],
	providers: [TelegramBotService],
	controllers: [TelegramBotController],
	exports: [TelegramBotService]
})
export class TelegramBotModule {}