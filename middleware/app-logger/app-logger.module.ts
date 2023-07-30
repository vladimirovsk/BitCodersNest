import { Module } from '@nestjs/common';
import { AppLoggerService } from './app-logger.service';
import { GoogleLoggerModule } from '../google-logger/google-logger.module';

@Module({
	imports: [
		GoogleLoggerModule
	],
	providers: [
		AppLoggerService
	],
	exports: [
		AppLoggerService
	]
})
export class AppLoggerModule {

}