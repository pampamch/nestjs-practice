import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class ValidateCustomerAccountMiddleWare implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('ValidateCustomerAccountMiddleWare');
    const { valid } = req.headers;
    if (valid) {
      next();
    } else {
      res.status(401).send({ error: 'Account is invalid' });
    }
  }
}

// can be function like the example below

// export function ValidateCustomerAccountMiddleWare(
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ) {
//   console.log('Request....');
//   next();
// }
