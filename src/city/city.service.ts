import { Injectable, NotFoundException } from '@nestjs/common';
import { City } from '@prisma/client';
import { CacheService } from '../cache/cache.service';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CityService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cacheService: CacheService,
  ) {}

  async findAll(): Promise<City[]> {
    return this.cacheService.getCache<City[]>('cities', () => {
      return this.prisma.city.findMany({ include: { state: true } });
    });
  }

  async findAllPaginated(
    page: number = 1,
    pageSize: number = 10,
  ): Promise<City[]> {
    const skip = (page - 1) * pageSize;
    return this.prisma.city.findMany({
      skip,
      take: pageSize,
      include: { state: true },
    });
  }

  async findAllCitiesFromState(stateId: number): Promise<City[]> {
    return this.cacheService.getCache<City[]>(`state_${stateId}`, () => {
      return this.prisma.city.findMany({ where: { stateId } });
    });
  }

  async findAllCitiesByName(name: string): Promise<City[]> {
    return this.cacheService.getCache<City[]>(`name_${name}`, () => {
      return this.prisma.city.findMany({
        where: { name: { contains: name } },
        include: { state: true },
      });
    });
  }

  async findCityById(cityId: number): Promise<City> {
    const city = await this.prisma.city.findUnique({
      where: {
        id: cityId,
      },
      include: {
        state: true,
      },
    });

    if (!city) {
      throw new NotFoundException('City not found');
    }
    return city;
  }
}
