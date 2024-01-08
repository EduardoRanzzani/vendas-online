import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { CreateUserDTO } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Post()
  @UsePipes(ValidationPipe)
  async createUser(@Body() createUserDTO: CreateUserDTO): Promise<User> {
    return await this.userService.createUser(createUserDTO);
  }
}
