import { IsInt, IsString } from 'class-validator';

export class CreateCityDTO {
  @IsString()
  name: string;

  @IsInt()
  stateId: number;
}
