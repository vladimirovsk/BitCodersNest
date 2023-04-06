import { ConsoleLogger, Injectable } from '@nestjs/common';
import { LogLevel } from '@nestjs/common/services/logger.service';

@Injectable()
export class AppLoggerService extends ConsoleLogger {
  constructor() {
    super();
  }

  log(message: any, context?: string) {
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
