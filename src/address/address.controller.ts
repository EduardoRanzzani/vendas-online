import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { Address } from '@prisma/client';
import { Roles } from '../decorators/roles.decorator';
import { UserType } from '../user/enum/user-type.enum';
import { AddressService } from './address.service';
import { CreateAddressDTO } from './dto/create-address.dto';

@Roles(UserType.USER)
@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post(':userId')
  async create(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() createAddressDTO: CreateAddressDTO,
  ): Promise<Address> {
    return await this.addressService.create(createAddressDTO, userId);
  }

  @Get()
  async getAllAddress(): Promise<Address[]> {
    return await this.addressService.findAllAddress();
  }

  @Get('/user/:userId')
  async getAllAddressByUser(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<Address[]> {
    return await this.addressService.findAllAddressByUserId(userId);
  }
}
