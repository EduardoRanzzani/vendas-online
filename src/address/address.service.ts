import { Injectable, NotFoundException } from '@nestjs/common';
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

  async createAddress(
    createAddressDTO: Prisma.AddressCreateInput,
    userId: number,
  ): Promise<Address> {
    await this.userService.findById(userId);
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
    const address = await this.prisma.address.findMany({
      include: {
        city: {
          include: {
            state: true,
          },
        },
        user: true,
      },
    });
    if (!address) {
      throw new NotFoundException('No Addresses found');
    }
    return address;
  }

  async findById(id: number): Promise<Address> {
    const address = await this.prisma.address.findUnique({ where: { id } });
    if (!address) {
      throw new NotFoundException('Address not found');
    }
    return address;
  }

  async findAllAddressByUserId(userId: number): Promise<Address[]> {
    await this.userService.findById(userId);
    const address = await this.prisma.address.findMany({ where: { userId } });
    if (!address) {
      throw new NotFoundException('Address not found');
    }
    return address;
  }

  async updateAddress(
    id: number,
    addressUpdateDTO: Prisma.AddressUpdateInput,
  ): Promise<Address> {
    await this.findById(id);
    return this.prisma.address.update({
      where: { id },
      data: {
        ...addressUpdateDTO,
      },
    });
  }

  async deleteAddress(id: number): Promise<Address> {
    await this.findById(id);
    return this.prisma.address.delete({
      where: { id },
    });
  }
}
