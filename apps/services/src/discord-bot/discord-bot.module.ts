import { Module } from '@nestjs/common';
import { DiscordModule } from '@discord-nestjs/core';
import { HelpCommand } from './comands/help.command';
import { DiscordBotGateway } from './discord-bot.gateway';
import { ErrorsCommand } from './comands/errors.command';
import { DiscordBotClient } from './discord-bot.client';
import { RMQModule } from 'nestjs-rmq';
import { getRMQConfig } from '../../../../configs/rmq.config';

@Module({
  imports: [
    RMQModule.forRootAsync(getRMQConfig()),
    DiscordModule.forFeature(),
  ],
  providers: [
    HelpCommand,
    ErrorsCommand,
    DiscordBotGateway,
    DiscordBotClient
    ],
})

export class DiscordBotModule {}
