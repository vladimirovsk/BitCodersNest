import { Injectable, Logger, OnModuleInit, UseGuards, UseInterceptors } from '@nestjs/common';
import { InjectDiscordClient, On, Once, MessageEvent } from '@discord-nestjs/core';
import { Client, Message } from 'discord.js';
import { CollectorInterceptor, PrefixCommandInterceptor, PrefixCommandPipe } from '@discord-nestjs/common';

@Injectable()
export class DiscordBotGateway implements OnModuleInit {
  private readonly logger = new Logger(DiscordBotGateway.name);

  constructor(
    @InjectDiscordClient()
    private readonly client: Client,
  ) {}

  onModuleInit() {
	  console.log('MODULE INIT: '+DiscordBotGateway.name);
		//this.client.channels.client
  }

  @Once('ready')
  onReady() {
    if (this.client?.user) {
      this.logger.log(`Bot ${this.client.user.tag} was started!`);
    }
  }

  //  @On('messageCreate')
  // // @UseInterceptors(CollectorInterceptor)
  // // @UseCollectors(AppreciatedReactionCollector)
  //  async onMessage(message: Message): Promise<void> {
  // 	// console.log('MESSAGE', message.content);
  // 	 if (!message.author.bot) {
  // 		 await message.reply("I'm watching you");
  // 	 }
  //  	//await message.reply('Start collector');
  //  }

  //  @On('messageCreate')
  //  @UseInterceptors(CollectorInterceptor)
  // async onMessageStart(message: Message){
  // 	  try {
  // 		  if (!message.author.bot) {
  // 			  console.log(message);
  // 			  return `not found command ${message.toString()}`;
  // 		  }
  // 	  } catch (e) {
  // 			console.error(e)
  // 	  }
  // }
}