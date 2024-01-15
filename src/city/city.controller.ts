import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { City } from '@prisma/client';
import { Roles } from '../decorators/roles.decorator';
import { UserType } from '../user/enum/user-type.enum';
import { CityService } from './city.service';

@Roles(UserType.ADMIN, UserType.USER)
@Controller('city')
@ApiTags('Cities')
export class CityController {
  constructor(private readonly service: CityService) {}

  @Get()
  async findAll(): Promise<City[]> {
    return await this.service.findAll();
  }

  @Get('/page')
  async findPaginated(): Promise<City[]> {
    return await this.service.findAllPaginated({});
  }

  @Get(':stateId')
  async findAllCitiesFromState(
    @Param('stateId', ParseIntPipe) stateId: number,
  ): Promise<City[]> {
    return await this.service.findAllCitiesFromState(stateId);
  }

  @Get('/name/:name')
  async findAllCitiesByName(@Param('name') name: string): Promise<City[]> {
    return await this.service.findAllCitiesByName(name);
  }
}
