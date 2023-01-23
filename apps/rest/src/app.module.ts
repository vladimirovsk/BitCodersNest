
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
// import * as Joi from '@hapi/joi';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { ProjectModule } from './project/project.module';
// import { getMongoConfig } from '../../../configs/mongo.config';
// import { AuthModule } from './auth/auth.module';
// import { UserModule } from './users/user.module';
// import { RMQModule } from 'nestjs-rmq';
// import { getRMQConfig } from '../../../configs/rmq.config';
import { AppService } from './app.service';
import { getMongoString } from '../../../configs/mongo.config';

import * as process from 'process';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: 'mongodb://root:tHD56lRBqBnTOcv6@127.0.0.1:27017/admin',
        // getMongoString(configService),
      }),
      inject: [ConfigService],
    }),
    ProjectModule,
    // UserModule,
    // AuthModule,
    ConfigModule.forRoot({
      // validationSchema: Joi.object({
      //   GOOGLE_AUTH_CLIENT_ID: Joi.string().required(),
      //   GOOGLE_AUTH_CLIENT_SECRET: Joi.string().required(),
      // }),
      //       envFilePath: `.env.${environment}`,
      envFilePath: '.env', //`.env.${environment}`,
      isGlobal: true,
    }),
    //TODO not working in docker
    //RMQModule.forRootAsync(getRMQConfig()),
  ],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
