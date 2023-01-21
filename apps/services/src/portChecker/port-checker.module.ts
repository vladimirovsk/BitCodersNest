import { Module } from '@nestjs/common';
import { PortCheckerService } from './port-checker.service';
import { PortCheckerController } from './port-checker.controller';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ScheduleModule.forRoot()
  ],
  providers: [PortCheckerService],
  controllers: [PortCheckerController],
  exports: [],
})
export class PortCheckerModule {}
