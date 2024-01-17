import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Test, TestingModule } from '@nestjs/testing';
import { Cache } from 'cache-manager';
import { CacheService } from '../cache.service';

describe('CacheService', () => {
  let service: CacheService;
  let cacheManager: Cache;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CacheService,
        {
          provide: CACHE_MANAGER,
          useValue: {
            get: jest.fn(),
            set: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CacheService>(CacheService);
    cacheManager = module.get(CACHE_MANAGER);
  });

  describe('CachedData', () => {
    it('should return data in cache', async () => {
      const user = await service.getCache('key', () => null);
      expect(user).toEqual(null);
    });

    it('should return data in function', async () => {
      const result = { test: 'test' };
      jest.spyOn(cacheManager, 'get').mockResolvedValue(undefined);

      const user = await service.getCache('key', () => Promise.resolve(result));
      expect(user).toEqual(result);
    });
  });
});
