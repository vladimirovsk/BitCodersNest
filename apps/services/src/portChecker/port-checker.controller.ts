import { Controller, Logger } from '@nestjs/common';
import { PortCheckerService } from './port-checker.service';
import { Interval } from '@nestjs/schedule';

@Controller('port-checker')
export class PortCheckerController {
  private logger = new Logger(PortCheckerController.name)
  constructor(
    private readonly portChecker: PortCheckerService,
  ) {
  }

 @Interval('check ',2*1000)
  async startPortChecker() {
    const serverSQL = await this.portChecker.initPortCheck( '91.197.16.103', 33239);
    const serverBS = await this.portChecker.initPortCheck( '91.197.16.103', 33238);
    this.logger.log(`PORT CHECK serverSQL:${serverSQL}, serverBS:${serverBS}`)
 }
}