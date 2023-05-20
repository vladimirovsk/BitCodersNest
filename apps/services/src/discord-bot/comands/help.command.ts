import { CommandInteraction } from 'discord.js';
import { Injectable, OnModuleInit, UsePipes } from '@nestjs/common';
import { Command, Handler, IA } from '@discord-nestjs/core';
import { SlashCommandPipe } from '@discord-nestjs/common';

@Command({
  name: 'help',
  description: 'Get command list',
})
@Injectable()
export class HelpCommand implements OnModuleInit {
  onModuleInit() {
		// console.log('MODULE INIT '+HelpCommand.name);
  }

  @Handler()
  onCommandList(interaction: CommandInteraction) {
    return `Bot commands:
     /help - to see help
     /errors - get errors list
     `;
  }
}