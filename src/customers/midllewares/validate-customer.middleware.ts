import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class ValidateCustomerMiddleWare implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('ValidateCustomerMiddleWare');
    const { authorization } = req.headers;
    if (!authorization) {
      return res
        .status(403)
        .send({ error: 'No Authentication Token Provided' });
    }
    if (authorization === '123') {
      next();
    } else {
      return res
        .status(403)
        .send({ error: 'Invalid Authentication Token Provided' });
    }
  }
}

// can be function like the example below

// export function ValidateCustomerMiddleWare(
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ) {
//   console.log('Request....');
//   next();
// }
