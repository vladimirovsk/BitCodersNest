import { forwardRef, Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import net from 'net';
import { TelegramBotService } from '../telegram-bot/telegram-bot.service';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class PortCheckerService {
  private logger = new Logger(PortCheckerService.name);
  @Inject(forwardRef(() => TelegramBotService))
  private readonly telegramBotService: TelegramBotService
  constructor(
    private configService: ConfigService,
  ) {}
  async initPortCheck(host: string, port: number) {
    return new Promise((resolve, reject) => {
      const socket = new net.Socket();
      socket.on('connect', () => {
        socket.destroy();
        resolve(true);
      });
      socket.on('timeout', () => {
        socket.destroy();
        resolve(false);
      });
      socket.on('error', () => {
        socket.destroy();
        resolve(false);
        //reject(false)
      });
      socket.connect(port, host);
    });
  }

  private getStatusServer(server){
    return this.initPortCheck('65.108.199.29', server.port)
      .then(status => {
        server.status = status;
        return server;
      });
  }

  async getStatusServersDto(getMessage: boolean = false){

    const serversDto = [
      { name:'serverSQL', status: false, port: 33239 },
      { name:'serverPIP', status: false, port: 33237},
      { name:'serverBS', status: false, port: 33230 },
      { name:'serverCL1', status: false, port: 33130 },
      { name:'serverOKT', status: false, port: 28543 },
      { name:'serverPROFIT', status: false, port: 28542 }
    ]

    const promises = serversDto.map(server=> this.getStatusServer.call(this, server))

    const result = await Promise.all(promises)

    if (result.some(server => server.status === false)) {
      const message = `Alarm Server access denied ${JSON.stringify(serversDto.filter(server => !server.status), null, 2)}`


      await this.telegramBotService.sendMessage(
          message,
          <string>this.configService.get('TELEGRAM_BOT_CHANEL'))
          .catch(err=>{
           this.logger.error(err);
        })
    }

    if (getMessage) return result
  }
}
