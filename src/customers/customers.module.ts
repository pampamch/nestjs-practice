import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { CustomersController } from './controllers/customers.controller';
import { ValidateCustomerAccountMiddleWare } from './midllewares/validate-customer-account.middleware';
import { ValidateCustomerMiddleWare } from './midllewares/validate-customer.middleware';
import { CustomersService } from './services/customers.service';

@Module({
  controllers: [CustomersController],
  providers: [CustomersService],
})
export class CustomersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        ValidateCustomerMiddleWare,
        ValidateCustomerAccountMiddleWare,
        (req: Request, res: Response, next: NextFunction) => {
          console.log('last middleware');
          next();
        },
      ) //> if it is class middleware
      .forRoutes({
        path: '/customers/search/:id',
        method: RequestMethod.GET,
      }); // hooks path of customer controller

    // .apply(ValidateCustomerMiddleWare) //>> if it is function middleware
    // .forRoutes(CustomersController); //>> hooks the whole path of customer controller

    // .exclude({
    //   path: '/customers/create',
    //   method: RequestMethod.POST,
    // }) //>> exclude this path
  }
}
