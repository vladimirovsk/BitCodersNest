import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectDiscordClient } from '@discord-nestjs/core';
import { Client } from 'discord.js';

@Injectable()
export class RateService implements OnModuleInit{
  private logger = new Logger(RateService.name)
  constructor(
    @InjectDiscordClient()
    private readonly client: Client,
  ) {
  }

  async onModuleInit() {
    this.logger.log('RATE SERVICE INIT')
    // const channel = await this.client.channels.cache.get('1077719849834393734');
    // const channel = await this.client.channels.fetch( '1077719849834393734', {

    // });
    // console.log(channel)
    // channel.send({content: "Example Message"})
  }
}