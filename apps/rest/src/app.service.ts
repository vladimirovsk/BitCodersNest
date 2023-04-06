import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService implements OnModuleInit {
  private logger = new Logger(AppService.name);
  constructor(
    private readonly configService: ConfigService
  ) {}
  onModuleInit() {
    this.logger.log('REST SERVICE STARTING');
  }
}
