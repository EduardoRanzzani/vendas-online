import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { City } from '@prisma/client';
import { CityService } from './city.service';

@Controller('city')
export class CityController {
  constructor(private readonly service: CityService) {}

  @Get()
  async findAll(): Promise<City[]> {
    return await this.service.findAll();
  }

  @Get('paginated')
  async findAllPaginated(
    @Query('page', ParseIntPipe) page: number = 1,
    @Query('pageSize', ParseIntPipe) pageSize: number = 10,
  ): Promise<City[]> {
    return await this.service.findAllPaginated(page, pageSize);
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
