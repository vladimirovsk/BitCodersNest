import { Module } from '@nestjs/common';
import { DiscordModule } from '@discord-nestjs/core';
import { HelpCommand } from './comands/help.command';
import { DiscordBotGateway } from './discord-bot.gateway';
import { InjectDynamicProviders } from 'nestjs-dynamic-providers';
import { ErrorsCommand } from './comands/errors.command';

// @InjectDynamicProviders('**/*.command.ts')
@Module({
  imports: [
    DiscordModule.forFeature(),
  ],
  providers: [HelpCommand, ErrorsCommand, DiscordBotGateway],
})

export class DiscordBotModule {}
