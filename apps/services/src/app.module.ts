import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { RMQModule } from 'nestjs-rmq';
import { getRMQConfig } from '../../../configs/rmq.config';
import { ConfigModule } from '@nestjs/config';
import { RateModule } from './rate/rate.module';
import { PortCheckerModule } from './portChecker/port-checker.module';
import { LoggerMiddleware } from './middleware/logger.middleware';


@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true, envFilePath: '.env'}),
    // RMQModule.forRootAsync(getRMQConfig()),
    RateModule,
    PortCheckerModule,
  ]
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({path: '/api/*', method: RequestMethod.ALL});
  }
}
