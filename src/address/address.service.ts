import { Injectable } from '@nestjs/common';
import { Address } from '@prisma/client';
import { CityService } from '../city/city.service';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from '../user/user.service';
import { CreateAddressDTO } from './dto/create-address.dto';

@Injectable()
export class AddressService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
    private readonly cityService: CityService,
  ) {}

  async create(
    createAddressDTO: CreateAddressDTO,
    userId: number,
  ): Promise<Address> {
    await this.userService.findUserById(userId);
    await this.cityService.findCityById(createAddressDTO.cityId);

    return this.prisma.address.create({
      data: {
        ...createAddressDTO,
        userId,
      },
    });
  }

  async findAllAddress(): Promise<Address[]> {
    return this.prisma.address.findMany();
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
