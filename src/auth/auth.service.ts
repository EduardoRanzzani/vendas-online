import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@prisma/client';
import { compare } from 'bcrypt';
import { UserService } from '../user/user.service';
import { LoginDTO } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async login(loginDTO: LoginDTO): Promise<User> {
    const user: User | undefined = await this.userService
      .findUserByEmail(loginDTO.username)
      .catch(() => undefined);

    const isMatchingPassword = await compare(
      loginDTO.password,
      user?.password || '',
    );

    if (!user || !isMatchingPassword) {
      throw new NotFoundException('Invalid username or password');
    }

    return user;
  }
}
