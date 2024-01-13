import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Prisma, User } from '@prisma/client';
import { Roles } from '../decorators/roles.decorator';
import { UserType } from './enum/user-type.enum';
import { UserService } from './user.service';

@Roles(UserType.ADMIN, UserType.USER)
@Controller('user')
@ApiTags('Users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createUser(
    @Body() createUserDTO: Prisma.UserCreateInput,
  ): Promise<User> {
    return await this.userService.createUser(createUserDTO);
  }

  @Get()
  async getAllUsers(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Get(':id')
  async getUserById(@Param('id', ParseIntPipe) userId: number): Promise<User> {
    return await this.userService.findUserById(userId);
  }

  @Get('/email/:email')
  async getUserByEmail(@Param('email') email: string): Promise<User> {
    return this.userService.findUserByEmail(email);
  }

  @Patch(':id')
  async updateUser(
    @Param('id', ParseIntPipe) userId: number,
    @Body() updateUserDTO: Prisma.UserUpdateInput,
  ): Promise<User> {
    return await this.userService.updateUser(userId, updateUserDTO);
  }

  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) userId: number): Promise<User> {
    return await this.userService.deleteUser(userId);
  }
}
