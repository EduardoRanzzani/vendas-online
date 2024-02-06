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
import { UserService } from './user.service';

// @Roles(UserType.ADMIN, UserType.USER)
@Controller('user')
@ApiTags('Users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createUser(
    @Body() createUserDTO: Prisma.UserCreateInput,
  ): Promise<User> {
    return await this.userService.create(createUserDTO);
  }

  @Get()
  async getAllUsers(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Get(':id')
  async getUserById(@Param('id', ParseIntPipe) userId: number): Promise<User> {
    return await this.userService.findById(userId);
  }

  @Get('/email/:email')
  async getUserByEmail(@Param('email') email: string): Promise<User> {
    return this.userService.findByEmail(email);
  }

  @Patch(':id')
  async updateUser(
    @Param('id', ParseIntPipe) userId: number,
    @Body() updateUserDTO: Prisma.UserUpdateInput,
  ): Promise<User> {
    return await this.userService.update(userId, updateUserDTO);
  }

  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) userId: number): Promise<User> {
    return await this.userService.delete(userId);
  }
}
