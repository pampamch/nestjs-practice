import { Injectable } from '@nestjs/common';
import { CustomersDTO } from 'src/customers/dto/customers.dto';
import { Customer } from 'src/customers/types/Customer';

@Injectable()
export class CustomersService {
  private customers: Customer[] = [
    {
      id: 1,
      name: 'pam',
      email: 'pam@gmail.com',
      address: {
        line1: '1',
        city: 'NY',
        zipcode: 121323,
      },
    },
    {
      id: 2,
      name: 'praew',
      email: 'praew@gmail.com',
      address: {
        line1: '2',
        city: 'NY',
        zipcode: 121323,
      },
    },
    {
      id: 3,
      name: 'pepe',
      email: 'pepe@gmail.com',
      address: {
        line1: '3',
        line2: '232',
        city: 'NY',
        zipcode: 121323,
      },
    },
  ];

  findCustomers() {
    return this.customers;
  }

  findCustomerById(id: number) {
    return this.customers.find((c) => c.id === id);
  }

  createCustomer(customer: CustomersDTO) {
    return this.customers.push(customer);
  }

  getByCondition(predicate: (customer: CustomersDTO) => boolean) {
    return this.customers.filter((c) => predicate(c));
  }
}
