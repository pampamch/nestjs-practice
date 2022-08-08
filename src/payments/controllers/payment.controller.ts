import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

@Controller('payment')
export class PaymentController {
  @Get()
  getpayments(@Req() req: Request, @Res() res: Response) {
    const { count, page } = req.query;
    if (!count || !page) {
      res.status(400).send({ msg: 'Missing count or page query parameter' });
    } else {
      res.send(200);
    }
  }
}
