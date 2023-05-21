import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RateModule } from './rate/rate.module';
import { DiscordBotModule } from './discord-bot/discord-bot.module';
import { DiscordModule } from '@discord-nestjs/core';
import { GatewayIntentBits } from 'discord.js';
// import { DiscordConfigService } from '../../../configs/discord.config';
import { DiscordConfigService } from '@Configs/discord.config';
import { LoggerMiddleware } from '@Middleware/logger.middleware';

// if (process.env.PORT_CHECKER === 'true') {
//   imports.push(PortCheckerModule);
// }

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    DiscordModule.forRootAsync({
      useClass: DiscordConfigService,
    }),
    RateModule,
    DiscordBotModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '/api/*', method: RequestMethod.ALL });
  }
}
