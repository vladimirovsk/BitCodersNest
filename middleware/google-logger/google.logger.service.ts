import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { google } from '@google-cloud/logging/build/protos/protos';
import LogSeverity = google.logging.type.LogSeverity;
const {Logging} = require('@google-cloud/logging');
const {Storage} = require('@google-cloud/storage');
@Injectable()
export class GoogleLoggerService {

  private projectId = this.configService.get('GOOGLE_PROJECT_ID');
  // private clientId = this.configService.get('GOOGLE_CLIENT_ID');
  // private clientSecret = this.configService.get('GOOGLE_CLIENT_SECRET');
  private logging =  new Logging({
    projectId:this.projectId,
    credentials: {
      client_id: "764086051850-6qr4p6gpi6hn506pt8ejuq83di341hur.apps.googleusercontent.com",
      client_secret: "d-FL95Q19q7MQmFpd7hHD0Ty",
      quota_project_id: "eshyft-386214",
      refresh_token: "1//06w1mAYf5Z6NDCgYIARAAGAYSNwF-L9IrCpo1aSPphPIt_i-N55QITKG9VkK3fXG5i6bjLAq95lg83YnyTwTUDCcgicdAB4mPBXQ",
      type: "authorized_user"
    }
  });

  constructor(
    private readonly configService: ConfigService
  ) {
  }

  sendMessage(
    message: string,
    typeLog:LogSeverity,
    serviceName:string = 'REST-SERVICE',
    server:string = 'dev'){
    try {
       const log = this.logging.log(serviceName);
      //
      // DEFAULT = 0,
      //   DEBUG = 100,
      //   INFO = 200,
      //   NOTICE = 300,
      //   WARNING = 400,
      //   ERROR = 500,
      //   CRITICAL = 600,
      //   ALERT = 700,
      //   EMERGENCY = 800
      const metadata = {
        severity: typeLog,
        labels: {
          server,
        },
        resource: {
          type: 'global',
        },
      };
      const entry = log.entry(metadata, message);

      new Promise((resolve, reject) => {
        log.write(entry, (error, result)=>{
          if (!error){resolve(result)}
          else {reject(error)}
        })
      }).catch((err)=>{
        console.error('Error send to Google logger', err)
      });

    } catch (err) {
      console.error(`Error send to google logger ${err}`)
    }
  }
}