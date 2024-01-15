import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { State } from '@prisma/client';
import { Roles } from '../decorators/roles.decorator';
import { UserType } from '../user/enum/user-type.enum';
import { StateService } from './state.service';

@Roles(UserType.ADMIN, UserType.USER)
@Controller('state')
@ApiTags('States')
export class StateController {
  constructor(private readonly service: StateService) {}

  @Get('/page')
  async findPaginated(): Promise<State[]> {
    return await this.service.findPaginated({});
  }

  @Get()
  async findAll(): Promise<State[]> {
    return await this.service.findAll();
  }
}
