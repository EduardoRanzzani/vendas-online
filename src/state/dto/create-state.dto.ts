import { IsString } from 'class-validator';

export class CreateStateDTO {
  @IsString()
  name: string;
}
