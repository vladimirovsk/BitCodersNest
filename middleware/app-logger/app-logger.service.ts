import { ConsoleLogger, Inject, Injectable } from '@nestjs/common';
import { LogLevel } from '@nestjs/common/services/logger.service';
import { GoogleLoggerService } from '../google-logger/google.logger.service';
import { ConfigService } from '@nestjs/config';
import { google } from '@google-cloud/logging/build/protos/protos';
import LogSeverity = google.logging.type.LogSeverity;

@Injectable()
export class AppLoggerService extends ConsoleLogger {
  constructor(
    private googleLoggerService: GoogleLoggerService,
    private configService: ConfigService
  ) {
    super();
  }

  log(message: any, context?: string) {

    //console.log('APP_NAME: ', typeLog:LogSeverity this.configService.get('appName'));
    this.googleLoggerService.sendMessage(message, LogSeverity.INFO, String(this.configService.get('appName')),  'dev');
    const colorScope: LogLevel = 'warn';
    const colorMessg: LogLevel = 'log';
    if (!context) {
      context = 'LoggerService';
    }
    super.log(
      `${super.colorize(
        `${super.colorize(`[${context}]`, colorScope)} ${super.colorize(
          message,
          colorMessg,
        )}`,
        colorMessg,
      )}`,
    );
  }

  debug(message: any, context?: string) {
    const colorScope: LogLevel = 'warn';
    const colorMessg: LogLevel = 'debug';
    if (!context) {
      context = 'LoggerService';
    }
    if (message) {
      super.debug(
        `${super.colorize(
          `${super.colorize(`[${context}]`, colorScope)} ${super.colorize(
            message,
            colorMessg,
          )}`,
          colorMessg,
        )}`,
      );
    }
  }

  verbose(message: any, context?: string) {
    const colorScope: LogLevel = 'warn';
    const colorMessg: LogLevel = 'verbose';
    if (!context) {
      context = 'LoggerService';
    }
    if (message) {
      super.verbose(
        `${super.colorize(
          `${super.colorize(`[${context}]`, colorScope)} ${super.colorize(
            message,
            colorMessg,
          )}`,
          colorMessg,
        )}`,
      );
    }
  }

  error(message: any, stack?: string, context?: string) {
    const colorScope: LogLevel = 'error';
    const colorMessg: LogLevel = 'error';
    //TODO Register errors and add to listener
    if (!context) {
      context = 'LoggerService';
    }
    super.error(
      `${super.colorize(
        `${super.colorize(`[${context}]`, colorScope)} ${super.colorize(
          message,
          colorMessg,
        )}`,
        colorMessg,
      )}`,
    );
  }

  warn(message: any, string, context?: string) {
    const colorScope: LogLevel = 'debug';
    const colorMessg: LogLevel = 'warn';
    //TODO Register warning and add to listener
    if (!context) {
      context = 'LoggerService';
    }
    super.warn(
      `${super.colorize(
        `${super.colorize(`[${context}]`, colorScope)} ${super.colorize(
          message,
          colorMessg,
        )}`,
        colorMessg,
      )}`,
    );
  }
}
