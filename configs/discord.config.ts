import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { DiscordModuleOption, DiscordOptionsFactory } from '@discord-nestjs/core';
import { GatewayIntentBits, Message } from 'discord.js';

@Injectable()
export class DiscordConfigService implements DiscordOptionsFactory {
  constructor(
    private configService: ConfigService,
  ) {
  }
  createDiscordOptions(): DiscordModuleOption {
    return {
      token: <string>this.configService.get('DISCORD_TOKEN'),
      discordClientOptions: {
        intents: [
          GatewayIntentBits.Guilds,
          GatewayIntentBits.GuildMessages,
          // GatewayIntentBits.MessageContent,
          // GatewayIntentBits.GuildMembers,
        ],
      },
      registerCommandOptions: [
        {
          allowFactory: (message: Message) =>
            !message.author.bot && message.content === '!deploy',
          forGuild: '1105920777951379656',//<string>this.configService.get('GUILD_ID_WITH_COMMANDS'),
          removeCommandsBefore: true,
        },
      ],
    }
  }
}
