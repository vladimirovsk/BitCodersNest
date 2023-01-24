import { ConfigService } from '@nestjs/config';

export const getMongoString = (configService: ConfigService) => {
  const MONGO_HOSTNAME = configService.get<string>('MONGO_HOST') ?? 'mongo_bitcoders';
  const MONGO_USERNAME = configService.get<string>('MONGO_USER') ?? 'root';
  const MONGO_PASSWORD = configService.get<string>('MONGO_PASSWORD');
  const MONGO_PORT = Number(configService.get<number>('MONGO_PORT')) ?? 27017;
  const MONGO_DB = configService.get<string>('MONGO_DB') ?? 'admin';

  return `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?directConnection=true`;
  // return `mongodb://${MONGO_HOSTNAME}:${MONGO_PORT}?authSource=${MONGO_DB}&directConnection=true`;
};
