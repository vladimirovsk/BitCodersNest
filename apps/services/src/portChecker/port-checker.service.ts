import { forwardRef, Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import net from 'net';
import { TelegramBotService } from '../telegram-bot/telegram-bot.service';


@Injectable()
export class PortCheckerService {
  private logger = new Logger(PortCheckerService.name);
  @Inject(forwardRef(() => TelegramBotService))
  private readonly telegramBotService: TelegramBotService
  constructor(
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

  async getStatusServers(getMessage: boolean = false){
    const serverSQL = await this.initPortCheck( '65.108.199.29', 33239);
    const serverPIP = await this.initPortCheck( '65.108.199.29', 33237);
    const serverBS = await this.initPortCheck( '65.108.199.29', 33230);
    const serverCL1 = await this.initPortCheck( '65.108.199.29', 33130);
    const serverOKT = await this.initPortCheck( '65.108.199.29', 28543);
    const serverPROFIT = await this.initPortCheck( '65.108.199.29', 28542);

    if ((!serverSQL || !serverPIP || !serverBS || !serverCL1 || !serverOKT || !serverPROFIT || getMessage )  ) {
      const status = {
        serverSQL,
        serverPIP,
        serverBS,
        serverCL1,
        serverOKT,
        serverPROFIT
      }
      await this.telegramBotService.sendMessage(JSON.stringify(status, null, 2), '-4040356453')
        .catch(err=>{
         this.logger.error(err);
      })
    }
  }
}
