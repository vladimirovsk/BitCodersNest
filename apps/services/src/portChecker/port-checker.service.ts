import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import net from 'net';

@Injectable()
export class PortCheckerService{
  private logger = new Logger(PortCheckerService.name)

  constructor() {
  }

  async initPortCheck (host:string, port:number) {
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
}
