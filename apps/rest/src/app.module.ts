import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppService } from './app.service';
import { getMongoString } from '../../../configs/mongo.config';
import { AppLoggerModule } from '../../../middleware/app-logger/app-logger.module';
import * as Joi from '@hapi/joi';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerMiddleware } from '../../../middleware/logger.middleware';
import { RMQModule } from 'nestjs-rmq';
import { getRMQConfig } from '@Configs/rmq.config';
import { ProjectModule } from '../src/project/project.module';
import { UserModule } from '../src/users/user.module';
import { AuthModule } from '../src/auth/auth.module';
import { GoogleAuthModule } from '@Rest/src/google-auth/google-auth.module';
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
    // ScheduleModule.forRoot(),
    ProjectModule,
    UserModule,
    AuthModule,
    GoogleAuthModule,
  ],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '/api/*', method: RequestMethod.ALL });
  }
}
