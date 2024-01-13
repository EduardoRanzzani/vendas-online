import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { compare } from 'bcrypt';
import { UserService } from '../user/user.service';
import { LoginPayload } from './dto/login-payload.dto';
import { LoginDTO } from './dto/login.dto';
import { ReturnLogin } from './dto/return-login.dto';
import { ReturnUser } from './dto/return-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(loginDTO: LoginDTO): Promise<ReturnLogin> {
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

    return {
      access_token: this.jwtService.sign({ ...new LoginPayload(user) }),
      user: new ReturnUser(user),
    };
  }
}
