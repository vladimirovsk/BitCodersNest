import { Module } from '@nestjs/common';
import { WebsocketService } from './websocket.service';
import { WebSocketServerGateway } from './websocket.gateway';

@Module({
  imports: [],
  providers: [WebSocketServerGateway, WebsocketService],
  exports: [],
})
export class WebsocketModule {}
