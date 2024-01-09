import { Module } from '@nestjs/common';
import { CacheModule } from '../cache/cache.module';
import { CityController } from './city.controller';
import { CityService } from './city.service';

@Module({
  imports: [CacheModule],
  controllers: [CityController],
  providers: [CityService],
  exports: [CityService],
})
export class CityModule {}
