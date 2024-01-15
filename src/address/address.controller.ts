import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Address, Prisma } from '@prisma/client';
import { Roles } from '../decorators/roles.decorator';
import { UserId } from '../decorators/user-id.decorator';
import { UserType } from '../user/enum/user-type.enum';
import { AddressService } from './address.service';

@Roles(UserType.ADMIN, UserType.USER)
@Controller('address')
@ApiTags('Addresses')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  @ApiCreatedResponse({ type: Promise<Address> })
  async create(
    @UserId() userId: number,
    @Body() createAddressDTO: Prisma.AddressCreateInput,
  ): Promise<Address> {
    console.log({ userId });
    return this.addressService.createAddress(createAddressDTO, userId);
  }

  @Get()
  @ApiOkResponse({ type: Promise<Address[]>, isArray: true })
  async getAllAddress(): Promise<Address[]> {
    return this.addressService.findAllAddress();
  }

  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number): Promise<Address> {
    return this.addressService.findById(id);
  }

  @Get('/user/:userId')
  @ApiOkResponse({ type: Promise<Address[]>, isArray: true })
  async getAllAddressByUser(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<Address[]> {
    return this.addressService.findAllAddressByUserId(userId);
  }

  @Patch(':id')
  async updateAddress(
    @Param('id', ParseIntPipe) addressId: number,
    @Body() updateAddressDTO: Prisma.AddressUpdateInput,
  ) {
    return this.addressService.updateAddress(addressId, updateAddressDTO);
  }

  @Delete(':id')
  async deleteAddress(
    @Param('id', ParseIntPipe) addressId: number,
  ): Promise<Address> {
    return this.addressService.deleteAddress(addressId);
  }
}
