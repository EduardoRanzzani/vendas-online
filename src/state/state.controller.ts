import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { StateService } from './state.service';

@Controller('state')
@ApiTags('States')
export class StateController {
  constructor(private readonly service: StateService) {}

  @Get('/page')
  async findPaginated() {
    return await this.service.findPaginated({});
  }

  @Get()
  async findAll() {
    return await this.service.findAll();
  }
}
