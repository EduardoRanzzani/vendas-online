import { Injectable, NotFoundException } from '@nestjs/common';
import { City } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CityService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<City[]> {
    return this.prisma.city.findMany();
  }

  async findAllCitiesFromState(stateId: number): Promise<City[]> {
    return this.prisma.city.findMany({
      where: {
        stateId,
      },
    });
  }

  async findAllCitiesByName(name: string): Promise<City[]> {
    return this.prisma.city.findMany({
      where: {
        name: {
          contains: name,
        },
      },
    });
  }

  async findCityById(cityId: number): Promise<City> {
    const city = await this.prisma.city.findUnique({
      where: {
        id: cityId,
      },
    });

    if (!city) {
      throw new NotFoundException('City not found');
    }

    return city;
  }
}
