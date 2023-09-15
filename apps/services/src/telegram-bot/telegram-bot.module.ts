import { forwardRef, Module } from '@nestjs/common';
import { TelegramBotService } from './telegram-bot.service';
import { TelegrafModule } from 'nestjs-telegraf';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PortCheckerModule } from '../portChecker/port-checker.module';

@Module({
	imports:[

		TelegrafModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: (configService: ConfigService) => ({
				token: <string>configService.get<string>('TELEGRAM_BOT_TOKEN'),
				// launchOptions: {
				//   webhook: {
				//     domain: 'domain.tld',
				//     hookPath: '/secret-path',
				//   }
				// }
			}),
			inject: [ConfigService],
		}),
		forwardRef(()=>PortCheckerModule)
	],
	providers: [TelegramBotService],
	exports: [TelegramBotService]
})
export class TelegramBotModule {}