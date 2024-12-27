import morgan from 'morgan';
import logger from '../utils/logger';
import {Request, Response } from 'express';

const logging = morgan((tokens: any, req: Request, res: Response) => {
    const status = tokens.status(req, res);
    const message = [
      tokens.method(req, res),
      tokens.url(req, res),
      status,
      `${tokens['response-time'](req, res)} ms`,
      '-',
      `${tokens.res(req, res, 'content-length') || 0} bytes`,
    ].join(' ');
  
    if (status >= 400) {
        logger.error(message.trim());
    } else {
        logger.info(message.trim());
    }
    return null
  });

export default logging;