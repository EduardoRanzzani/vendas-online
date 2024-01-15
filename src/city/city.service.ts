import { Injectable, NotFoundException } from '@nestjs/common';
import { City, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { StateService } from '../state/state.service';

@Injectable()
export class CityService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly stateService: StateService,
  ) {}

  async findAll(): Promise<City[]> {
    return await this.prisma.city.findMany({
      include: {
        state: true,
      },
    });
  }

  async findAllPaginated(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.CityWhereUniqueInput;
    where?: Prisma.CityWhereInput;
    orderBy?: Prisma.CityOrderByWithRelationInput;
  }): Promise<City[]> {
    const { skip, take, cursor, where, orderBy } = params;

    const cities = await this.prisma.city.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
    if (!cities) {
      throw new NotFoundException('No cities found');
    }
    return cities;
  }

  async findAllCitiesFromState(stateId: number): Promise<City[]> {
    await this.stateService.findStateById(stateId);
    const cities = await this.prisma.city.findMany({ where: { stateId } });
    if (!cities) {
      throw new NotFoundException('No cities found');
    }
    return cities;
  }

  async findAllCitiesByName(name: string): Promise<City[]> {
    const cities = await this.prisma.city.findMany({ where: { name } });
    if (!cities) {
      throw new NotFoundException('No cities found');
    }
    return cities;
  }

  async findCityById(cityId: number): Promise<City> {
    const city = await this.prisma.city.findUnique({ where: { id: cityId } });
    if (!city) {
      throw new NotFoundException('City not found');
    }
    return city;
  }
}
