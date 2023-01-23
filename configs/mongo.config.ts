import { ConfigService } from '@nestjs/config';

export const getMongoString = (configService: ConfigService) =>
  `mongodb://${configService.get('MONGO_USER')}:${configService.get(
    'MONGO_PASSWORD',
  )}@${configService.get('MONGO_HOST')}:${configService.get(
    'MONGO_PORT',
  )}/${configService.get('MONGO_DB')}`;
