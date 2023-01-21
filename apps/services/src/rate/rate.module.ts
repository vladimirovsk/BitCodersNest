import { Module } from '@nestjs/common';
import { RateController } from './rate.controller';
import { RateService } from './rate.service';

@Module({
  imports:[] ,
  providers: [RateService],
  controllers: [RateController],
  exports: [RateService]
})

export class RateModule {

}