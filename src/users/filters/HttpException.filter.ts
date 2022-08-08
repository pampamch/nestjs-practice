import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    // console.log(exception.getResponse());
    // console.log(exception.getStatus());
    // console.log(exception);

    const context = host.switchToHttp();
    const request = context.getRequest<Request>(); //<Request> is type annotate
    const response = context.getResponse<Response>(); //<Response> is type annotate

    //send back the status
    // response.sendStatus(exception.getStatus());

    //or send back with both status and msg
    response.send({
      status: exception.getStatus(),
      message: exception.getResponse(),
    });
  }
}
