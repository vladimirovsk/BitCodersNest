import { Controller, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

@Controller()
export class UserListener{
	private logger = new Logger(UserListener.name)

	@OnEvent('TEST')
	testEvents(payload){
		//this.logger.error(`EMMIT PUSHER TEST ${payload}`)
	}
}
