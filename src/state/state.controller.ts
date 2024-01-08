import { Controller, Get } from '@nestjs/common';
import { StateService } from './state.service';

@Controller('state')
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
