import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { ProjectModule } from './project/project.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './users/user.module';
// import { RMQModule } from 'nestjs-rmq';
// import { getRMQConfig } from '../../../configs/rmq.config';
import { AppService } from './app.service';
import { getMongoString } from '../../../configs/mongo.config';

const configService = new ConfigService();

@Module({
  imports: [
    ConfigModule.forRoot({
      // validationSchema: Joi.object({
      //   GOOGLE_AUTH_CLIENT_ID: Joi.string().required(),
      //   GOOGLE_AUTH_CLIENT_SECRET: Joi.string().required(),
      // }),
      //envFilePath: `.env.${environment}`,
      //envFilePath: '.env', //`.env.${environment}`,
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: getMongoString(configService),
      }),
      inject: [ConfigService],
    }),
    ProjectModule,
    UserModule,
    AuthModule,
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
