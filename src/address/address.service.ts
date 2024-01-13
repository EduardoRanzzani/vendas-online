import { Injectable } from '@nestjs/common';
import { Address, Prisma } from '@prisma/client';
import { CityService } from '../city/city.service';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from '../user/user.service';

@Injectable()
export class AddressService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
    private readonly cityService: CityService,
  ) {}

  async create(
    createAddressDTO: Prisma.AddressCreateInput,
    userId: number,
  ): Promise<Address> {
    await this.userService.findUserById(userId);
    await this.cityService.findCityById(createAddressDTO.city.connect.id);

    return this.prisma.address.create({
      data: {
        ...createAddressDTO,
        user: {
          connect: {
            id: userId,
          },
        },
      },
      include: {
        city: {
          include: {
            state: true,
          },
        },
        user: true,
      },
    });
  }

  async findAllAddress(): Promise<Address[]> {
    return this.prisma.address.findMany({
      include: {
        city: {
          include: {
            state: true,
          },
        },
        user: true,
      },
    });
  }

  async findAllAddressByUserId(userId: number): Promise<Address[]> {
    const user = await this.userService.findUserById(userId);
    return this.prisma.address.findMany({
      where: {
        userId: user.id,
      },
    });
  }
}
