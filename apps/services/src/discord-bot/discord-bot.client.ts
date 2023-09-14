import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client, TextChannel } from 'discord.js';
import { InjectDiscordClient } from '@discord-nestjs/core';

@Injectable()
export class DiscordBotClient {
	private chanelError = '1105920777951379656';
	private chanelPlanning = '1077719849834393736';
	private chanelDebug = '1077719849834393734';

  constructor(
	  @InjectDiscordClient()
	  private readonly client: Client,
  ) {
  }

  async sendMessage(channelId: string, message: string): Promise<void> {
     this.client.on('ready', async () => {
      const channel = this.client.channels.cache.get(channelId) as TextChannel;
      await channel.send(message);
    });
  }
}