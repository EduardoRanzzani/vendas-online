import { IsInt, IsString } from 'class-validator';

export class CreateAddressDTO {
  @IsString()
  street: string;

  @IsString()
  complement?: string;

  @IsInt()
  numberAddress: number;

  @IsString()
  cep: string;

  @IsInt()
  cityId: number;
}
