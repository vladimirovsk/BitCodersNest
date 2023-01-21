import { Injectable, Logger, OnModuleInit } from '@nestjs/common';

@Injectable()
export class RateService implements OnModuleInit{
  private logger = new Logger(RateService.name)
  constructor() {
  }

  onModuleInit() {
    this.logger.log('RATE SERVICE INIT')
  }
}