import {Injectable, Logger, NestMiddleware} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
	private logger = new Logger('REQUEST')
	use(req: Request, res: Response, next: NextFunction) {
		this.logger.debug(`[${res.req.method}] ${res.req.originalUrl}`);
		next();
	}
}
