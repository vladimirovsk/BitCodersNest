import { IRMQServiceAsyncOptions } from 'nestjs-rmq';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const getRMQConfig = (): IRMQServiceAsyncOptions => ({
  inject: [ConfigService],
  imports: [ConfigModule],
  useFactory: (configService: ConfigService) => ({
    exchangeName: configService.get('RABBITMQ_EXCHANGE') ?? 'bitcoders',
    connections: [
      {
        login: configService.get('RABBITMQ_USER') ?? 'test',
        password: configService.get('RABBITMQ_PASSWORD') ?? 'test',
        host: String(configService.get('RABBITMQ_HOST')),
      },
    ],
    queueName: configService.get('RABBITMQ_QNAME') ?? 'bitcoders',
    prefetchCount: 32,
    serviceName: 'bitcoders-rate',
  }),
});
