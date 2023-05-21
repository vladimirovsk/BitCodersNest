import { CommandInteraction } from 'discord.js';
import { Injectable } from '@nestjs/common';
import { Command, Handler } from '@discord-nestjs/core';

@Command({
	name: 'errors',
	description: 'Get errors list',
})
@Injectable()
export class ErrorsCommand {

	@Handler()
	onErrorsList(interaction: CommandInteraction): string {
		return 'Show all errors..';
	}


}