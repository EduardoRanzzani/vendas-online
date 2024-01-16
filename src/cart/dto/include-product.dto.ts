import { IsNotEmpty, IsNumber } from 'class-validator';

export class IncludeProductDTO {
  @IsNumber()
  @IsNotEmpty()
  productId: number;

  @IsNumber()
  @IsNotEmpty()
  amount: number;
}
