import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter'
import { UserListener } from './user.listener';

@Module({
	imports: [
		EventEmitterModule.forRoot({
			ignoreErrors: false,
			maxListeners: 10,
		}),

	],
	providers: [UserListener],
	controllers: []
})
export class ListenersModule {}