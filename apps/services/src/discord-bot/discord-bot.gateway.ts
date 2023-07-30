import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectDiscordClient, On, Once } from '@discord-nestjs/core';
import { Client, Message } from 'discord.js';

@Injectable()
export class DiscordBotGateway implements OnModuleInit {
  private readonly logger = new Logger(DiscordBotGateway.name);

  constructor(
    @InjectDiscordClient()
    private readonly client: Client,
  ) {}

  onModuleInit() {
    console.log('MODULE INIT: ' + DiscordBotGateway.name);
    //this.client.channels.client
  }

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
      message.channel.send('TEST')
      console.log('MESSAGE_CREATE', message.content);
      await message.reply("I'm watching messageCreate");
    }
  }

  @On('ready')
  async onReadyOn(){
    if (this.client?.user) {
      const chanel = await this.client.channels.fetch('1077719849834393734');
      // console.log('CHANEL', chanel);
    }
  }
  // client.on('ready', client => {
  // client.channels.get('CHANNEL ID').send('Hello here!');
// })

  @Once('ready')
  onReady() {
    if (this.client?.user) {
      this.logger.log(`Bot ${this.client.user.tag} was started!`);
    }
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