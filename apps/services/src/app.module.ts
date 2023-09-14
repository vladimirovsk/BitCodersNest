import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RateModule } from './rate/rate.module';
import { DiscordBotModule } from './discord-bot/discord-bot.module';
import { DiscordModule } from '@discord-nestjs/core';
import { GatewayIntentBits } from 'discord.js';
import { DiscordConfigService } from '../../../configs/discord.config';
import { LoggerMiddleware } from '../../../middleware/logger.middleware';
import { PortCheckerModule } from './portChecker/port-checker.module';
import { SwaggerBotModule } from './swagger-bot/swagger-bot.module';

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
    // PortCheckerModule,
    DiscordBotModule,
    SwaggerBotModule
  ],
  providers: []
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '/api/*', method: RequestMethod.ALL });
  }
}
