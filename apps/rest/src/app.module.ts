import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppService } from './app.service';
import { getMongoString } from '../../../configs/mongo.config';
import { AppLoggerModule } from '../../../middleware/app-logger/app-logger.module';
import * as Joi from '@hapi/joi';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerMiddleware } from '../../../middleware/logger.middleware';
import { ProjectModule } from '../src/project/project.module';
import { UserModule } from '../src/users/user.module';
import { AuthModule } from '../src/auth/auth.module';
import { GoogleAuthModule } from '../src/google-auth/google-auth.module';
import { ListenersModule } from './listeners/listeners.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env', //`.env.${environment}`,
      isGlobal: true,
      load: [()=>({'appName':'APP_NAME_TEST_CONFIG'})],
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
    ListenersModule,
    AppLoggerModule,
    // RMQModule.forRootAsync(getRMQConfig()),
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
