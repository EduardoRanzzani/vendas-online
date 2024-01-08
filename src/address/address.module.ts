import { Module } from '@nestjs/common';
import { CityModule } from '../city/city.module';
import { UserModule } from '../user/user.module';
import { AddressController } from './address.controller';
import { AddressService } from './address.service';

@Module({
  imports: [UserModule, CityModule],
  controllers: [AddressController],
  providers: [AddressService],
})
export class AddressModule {}
