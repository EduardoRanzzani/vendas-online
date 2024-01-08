import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@prisma/client';
import { hash } from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDTO } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(createUserDTO: CreateUserDTO): Promise<User> {
    const saltOrRounds = 10;
    const passwordHashed = await hash(createUserDTO.password, saltOrRounds);

    return this.prisma.user.create({
      data: {
        ...createUserDTO,
        typeUser: 1,
        password: passwordHashed,
      },
    });
  }

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async findUserById(userId: number): Promise<User> {
    const user = await this.prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new NotFoundException('UserId Not Found');
    }

    return user;
  }
}
