import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AddressModule } from './address/address.module';
import { CityModule } from './city/city.module';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';
import { StateModule } from './state/state.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    UserModule,
    AddressModule,
    CityModule,
    StateModule,
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
