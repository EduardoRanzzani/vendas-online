import { Module } from '@nestjs/common';
import { CacheModule } from '../cache/cache.module';
import { StateModule } from '../state/state.module';
import { CityController } from './city.controller';
import { CityService } from './city.service';

@Module({
  imports: [CacheModule, StateModule],
  controllers: [CityController],
  providers: [CityService],
  exports: [CityService],
})
export class CityModule {}
