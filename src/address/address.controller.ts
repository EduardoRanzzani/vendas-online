import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Address, Prisma } from '@prisma/client';
import { Roles } from '../decorators/roles.decorator';
import { UserId } from '../decorators/user-id.decorator';
import { UserType } from '../user/enum/user-type.enum';
import { AddressService } from './address.service';

@Roles(UserType.USER)
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
    return await this.addressService.create(createAddressDTO, userId);
  }

  @Get()
  @ApiOkResponse({ type: Promise<Address[]>, isArray: true })
  async getAllAddress(): Promise<Address[]> {
    return await this.addressService.findAllAddress();
  }

  @Get('/user/:userId')
  @ApiOkResponse({ type: Promise<Address[]>, isArray: true })
  async getAllAddressByUser(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<Address[]> {
    return await this.addressService.findAllAddressByUserId(userId);
  }
}
