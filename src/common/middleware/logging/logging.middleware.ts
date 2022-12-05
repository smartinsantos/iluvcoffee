import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const REQUEST_TIME_LABEL = 'REQUEST_RESPONSE_TIME';
    console.time(REQUEST_TIME_LABEL);
    res.on('finish', () => console.timeEnd(REQUEST_TIME_LABEL));
    next();
  }
}
