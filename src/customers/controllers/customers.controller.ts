import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Req,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CustomersService } from 'src/customers/services/customers.service';
import { Request, Response } from 'express';
import { CustomersDTO } from 'src/customers/dto/customers.dto';
import { JWTAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('customers')
export class CustomersController {
  constructor(private customersService: CustomersService) {}

  @Get()
  getCustomer(@Query('name') customerName?: string) {
    if (customerName) {
      return this.customersService.getByCondition((customer) =>
        customer.name.includes(customerName),
      );
    }
    return this.customersService.findCustomers();
  }

  @Get(':id')
  getCustomersById(@Param('id', ParseIntPipe) id: number) {
    const customer = this.customersService.findCustomerById(id);
    if (customer) return customer;
    else throw new HttpException('Customer not found.', HttpStatus.BAD_REQUEST);
  }
  @Get('/search/:id')
  searchCustomersById(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const customer = this.customersService.findCustomerById(id);
    if (customer) {
      res.send(customer);
    } else {
      res.status(400).send({ msg: 'Customer not found.' });
    }
  }

  @Post('create')
  @UsePipes(ValidationPipe)
  createCustomer(@Body() createCustomerDto: CustomersDTO) {
    return this.customersService.createCustomer(createCustomerDto);
  }
}
