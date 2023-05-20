import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppService } from './app.service';
import { getMongoString } from '../../../configs/mongo.config';
import { AppLoggerModule } from '@Middleware/app-logger/app-logger.module';
import * as Joi from '@hapi/joi';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerMiddleware } from '@Middleware/logger.middleware';
import { RMQModule } from 'nestjs-rmq';
import { getRMQConfig } from '@Configs/rmq.config';
// import { AppLoggerService } from '@Middleware/app-logger/app-logger.service';

const configService = new ConfigService();

@Module({
  imports: [
    AppLoggerModule,
    ConfigModule.forRoot({
      envFilePath: '.env', //`.env.${environment}`,
      isGlobal: true,
    }),
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        GOOGLE_AUTH_CLIENT_ID: Joi.string().required(),
        GOOGLE_AUTH_CLIENT_SECRET: Joi.string().required(),
      }),
      //envFilePath: `.env.${environment}`,
      envFilePath: '.env',
      isGlobal: true,
    }),
    RMQModule.forRootAsync(getRMQConfig()),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: getMongoString(configService),
      }),
      inject: [ConfigService],
    }),
    // // ScheduleModule.forRoot(),
    // ProjectModule,
    // UserModule,
    // AuthModule,
    // GoogleAuthModule,
  ],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
