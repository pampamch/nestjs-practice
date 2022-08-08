import { IsNotEmpty } from 'class-validator';

export class AddressDTO {
  @IsNotEmpty()
  line1: string;

  line2?: string;

  @IsNotEmpty()
  city: string;

  @IsNotEmpty()
  zipcode: number;
}
