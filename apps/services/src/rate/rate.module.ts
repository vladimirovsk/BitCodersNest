import { Module } from '@nestjs/common';
import { RateController } from './rate.controller';
import { RateService } from './rate.service';
import { DiscordModule } from '@discord-nestjs/core';

@Module({
  imports:[
    DiscordModule.forFeature(),
  ] ,
  providers: [RateService],
  controllers: [RateController],
  exports: [RateService]
})

export class RateModule {

}