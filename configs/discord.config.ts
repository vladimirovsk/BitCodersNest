import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { DiscordModuleOption, DiscordOptionsFactory } from '@discord-nestjs/core';
import { GatewayIntentBits } from 'discord.js';

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
          // forGuild: '1077719849834393734',//<string>this.configService.get('GUILD_ID_WITH_COMMANDS'),
          removeCommandsBefore: true,
        },
      ],
    }
  }
}
