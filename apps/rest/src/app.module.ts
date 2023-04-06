import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProjectModule } from './project/project.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './users/user.module';
import { AppService } from './app.service';
import { getMongoString } from '../../../configs/mongo.config';
import { getRMQConfig } from '../../../configs/rmq.config';
import { AppLoggerModule } from '../../../middleware/app-logger/app-logger.module';
import * as Joi from '@hapi/joi';
import { RMQModule } from 'nestjs-rmq';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { LoggerMiddleware } from '../../../middleware/logger.middleware';
import { GoogleAuthModule } from './google-auth/google-auth.module';

const configService = new ConfigService();

@Module({
  imports: [
    AppLoggerModule,
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        GOOGLE_AUTH_CLIENT_ID: Joi.string().required(),
        GOOGLE_AUTH_CLIENT_SECRET: Joi.string().required()
      }),
        // envFilePath: `.env.${environment}`,
        envFilePath: '.env', //`.env.${environment}`,
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
    ScheduleModule.forRoot(),
    ProjectModule,
    UserModule,
    AuthModule,
    GoogleAuthModule,
  ],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
