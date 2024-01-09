import { ReturnUser } from '../../user/dto/return-user.dto';

export class ReturnLogin {
  access_token: string;
  user: ReturnUser;
}
