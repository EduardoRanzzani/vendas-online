import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Prisma, User } from '@prisma/client';
import { UserService } from './user.service';

@Controller('user')
@ApiTags('Users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Post()
  @UsePipes(ValidationPipe)
  async createUser(
    @Body() createUserDTO: Prisma.UserCreateInput,
  ): Promise<User> {
    return await this.userService.createUser(createUserDTO);
  }
}
