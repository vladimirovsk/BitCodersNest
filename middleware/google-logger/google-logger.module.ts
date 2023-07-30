import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GoogleLoggerService } from '../google-logger/google.logger.service';

@Module({
  imports: [ConfigModule],
  providers: [GoogleLoggerService],
  exports: [GoogleLoggerService]
})

export class GoogleLoggerModule {

}