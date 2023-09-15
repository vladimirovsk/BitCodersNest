import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService implements OnModuleInit {
  private logger = new Logger(AppService.name);
  constructor(
    private readonly configService: ConfigService
  ) {}
  onModuleInit() {
    //
    // timeArr.forEach(time =>{
    //   console.log(`START FUNCTION ${time}`)
    //   let promise = new Promise(function(resolve, reject) {
    //     setTimeout(() => resolve("done"),  time);
    //   }).then((data)=>{
    //     console.log(`data ${time}`);
    //   })
    // })
    // console.log('END FUNCTION');

  }
}
