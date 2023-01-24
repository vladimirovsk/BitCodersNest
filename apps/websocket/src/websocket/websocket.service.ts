import { Logger, Injectable, OnModuleInit } from '@nestjs/common';
import {
  ITokenInfo,
  IWebsocketMessage,
  TypeSocketMessage,
} from './websocket.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class WebsocketService implements OnModuleInit {
  //data default
  private tokens = [
    { symbol: 'BTC', current_rate: '22001' },
    { symbol: 'ETH', current_rate: '1600' },
  ];

  private logger = new Logger(WebsocketService.name);
  private dataMessage: IWebsocketMessage = {
    type: TypeSocketMessage.receive_rate,
    block: 0,
    data: {
      token: [],
    },
  };

  constructor(private configService: ConfigService) {}

  getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  async onModuleInit() {
    const activeTokens: ITokenInfo[] = [];
    if (this.tokens != null) {
      for await (const row of this.tokens) {
        activeTokens.push({
          symbol: row.symbol,
          rate: String(row.current_rate),
          time: new Date().getTime(),
        });
        this.logger.debug(`symbol: ${row.symbol} rate: ${row.current_rate}`);
      }
      this.dataMessage.data.token = activeTokens;
    }
  }

  //: Promise<IWebsocketMessage | null>
  async fetchDataMessageTokens(
    read = false,
  ): Promise<IWebsocketMessage | null | undefined> {
    let sendMessage = false;

    for await (const currentData of this.dataMessage.data.token) {
      const contract = { block_last: 1000 };

      currentData.rate = String(
        this.getRandom(1600000000000000000000000, 2300000000000000000000000),
      );

      const token = this.tokens.find(
        ({ symbol }) => String(symbol) == String(currentData.symbol),
      );
      // .tokensService.findBySymbol(currentData.symbol);

      if (String(currentData.rate) != String(token?.current_rate)) {
        if (this.dataMessage.block != contract?.block_last) {
          this.dataMessage.block = Number(1000);
        }
        currentData.time = new Date().getTime();

        //console.log( currentData.rate);
      }
    }

    sendMessage = true;

    if (sendMessage || read) {
      return this.dataMessage;
    } else {
      return null;
    }
  }
}
