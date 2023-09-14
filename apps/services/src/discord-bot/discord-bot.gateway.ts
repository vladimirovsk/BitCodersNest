import { Injectable, Logger  } from '@nestjs/common';
import { InjectDiscordClient, On, Once } from '@discord-nestjs/core';
import { Client, Message } from 'discord.js';

@Injectable()
export class DiscordBotGateway {
  private readonly logger = new Logger(DiscordBotGateway.name);

  constructor(
    @InjectDiscordClient()
    private readonly client: Client,
  ) {}

  @On('messageUpdate')
  async onMessageUpdate(oldMessage: Message, newMessage: Message){
      console.log('OLD:', oldMessage);
    console.log('NEW:', newMessage);
  }

  @On('message')
  async onMessage(message: Message){
    console.log('MESSAGE', message.content);
    await message.reply("I'm watching message");
  }

  @On('messageCreate')
  async onMessageCreate(message: Message) {
    if (!message.author.bot) {
      const chanel = message.channel;
      console.log('CHANEL', chanel.id)
      chanel.send('MESSAGE_CREATE')
      await message.reply("I'm watching "+message.content);
    }
  }

  @On('ready')
  async onReadyOn(){
    if (this.client?.user) {
      const chanel = await this.client.channels.fetch('1077719849834393734');
      //this.client.channels.('1105920777951379656')
      // console.log('CHANEL', chanel);
    }

   this.client.on('ready', client => {
      //client..send('Hello here!');
   })
  }

  //   @On('messageCreate')
  // // // @UseInterceptors(CollectorInterceptor)
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