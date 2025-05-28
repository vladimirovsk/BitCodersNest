import { Injectable, Logger, OnModuleInit } from '@nestjs/common';


@Injectable()
export class AppService {
  private logger = new Logger(AppService.name);
  constructor(
  ) {}
}
