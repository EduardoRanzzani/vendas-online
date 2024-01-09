import { User } from '@prisma/client';

export class ReturnUser {
  id: number;
  name: string;
  email: string;
  phone: string;
  cpf: string;

  constructor(user: User) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.phone = user.phone;
    this.cpf = user.cpf;
  }
}
