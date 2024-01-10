import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { hash } from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDTO } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(createUserDTO: CreateUserDTO): Promise<User> {
    const user = await this.findUserByEmail(createUserDTO.email).catch(
      () => undefined,
    );

    if (user) {
      throw new ConflictException('User already exists');
    }

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
    return this.prisma.user.findMany({
      include: {
        addresses: {
          include: {
            city: {
              include: {
                state: true,
              },
            },
          },
        },
      },
    });
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

  async findUserByEmail(email: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new NotFoundException('User Not Found');
    }
    return user;
  }
}
