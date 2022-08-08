import { AddressDTO } from '../dto/address.dto';

export interface Customer {
  id: number;
  name: string;
  email: string;
  address: AddressDTO;
}
