import { Test, TestingModule } from '@nestjs/testing';
import { City, State } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { StateService } from '../../state/state.service';
import { CityService } from '../city.service';

describe('CityService', () => {
  let cityService: CityService;
  let prismaService: PrismaService;
  let stateService: StateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CityService,
        {
          provide: PrismaService,
          useValue: {
            city: {
              findMany: jest.fn(),
              findUnique: jest.fn(),
            },
          },
        },
        {
          provide: StateService,
          useValue: {
            findStateById: jest.fn(),
          },
        },
      ],
    }).compile();

    cityService = module.get<CityService>(CityService);
    prismaService = module.get<PrismaService>(PrismaService);
    stateService = module.get<StateService>(StateService);
  });

  describe('findAllCities', () => {
    it('findAllCities should return an array of cities', async () => {
      const mockCities: City[] = [
        {
          id: 1,
          name: 'Some City',
          stateId: 1,
          createdAt: new Date(),
          updatedAt: undefined,
        },
        {
          id: 2,
          name: 'Some Other City',
          stateId: 1,
          createdAt: new Date(),
          updatedAt: undefined,
        },
      ];
      jest.spyOn(prismaService.city, 'findMany').mockResolvedValue(mockCities);
      const result = await cityService.findAll();
      expect(result).toEqual(mockCities);
    });
  });

  describe('findAllPaginated', () => {
    it('findAllPaginated should return an array of cities', async () => {
      const mockCities: City[] = [
        {
          id: 1,
          name: 'Some City',
          stateId: 1,
          createdAt: new Date(),
          updatedAt: undefined,
        },
        {
          id: 2,
          name: 'Some Other City',
          stateId: 1,
          createdAt: new Date(),
          updatedAt: undefined,
        },
      ];
      jest.spyOn(prismaService.city, 'findMany').mockResolvedValue(mockCities);

      const result = await cityService.findAllPaginated({
        skip: 0,
        take: 10,
        cursor: { id: 0 },
        where: { name: 'SomeCity' },
        orderBy: { name: 'asc' },
      });
      expect(result).toEqual(mockCities);
      expect(prismaService.city.findMany).toHaveBeenCalledWith({
        skip: 0,
        take: 10,
        cursor: { id: 0 },
        where: { name: 'SomeCity' },
        orderBy: { name: 'asc' },
      });
    });
  });

  describe('FindAllCitiesFromState', () => {
    it('findAllCitiesFromState should return an array of cities', async () => {
      const mockStateId = 1; // Pass a valid stateId for testing
      const mockState: State = {
        id: 1,
        name: 'Some State',
        uf: 'SS',
        createdAt: new Date(),
        updatedAt: undefined,
      };
      const mockCities: City[] = [
        {
          id: 1,
          name: 'Some City',
          stateId: 1,
          createdAt: new Date(),
          updatedAt: undefined,
        },
        {
          id: 2,
          name: 'Some Other City',
          stateId: 1,
          createdAt: new Date(),
          updatedAt: undefined,
        },
      ];

      jest.spyOn(stateService, 'findStateById').mockResolvedValue(mockState);
      jest.spyOn(prismaService.city, 'findMany').mockResolvedValue(mockCities);

      const result = await cityService.findAllCitiesFromState(mockStateId);

      expect(result).toEqual(mockCities);
    });
  });

  describe('FindAllCitiesByName', () => {
    it('findAllCitiesByName should return an array of cities', async () => {
      const mockCityName = 'Some City';
      const mockCities: City[] = [
        {
          id: 1,
          name: 'Some City',
          stateId: 1,
          createdAt: new Date(),
          updatedAt: undefined,
        },
        {
          id: 2,
          name: 'Some Other City',
          stateId: 1,
          createdAt: new Date(),
          updatedAt: undefined,
        },
      ];
      jest.spyOn(prismaService.city, 'findMany').mockResolvedValue(mockCities);

      const result = await cityService.findAllCitiesByName(mockCityName);

      expect(result).toEqual(mockCities);
    });
  });

  describe('FindCityById', () => {
    it('findCityById should return a city', async () => {
      const mockCityId = 1; // Pass a valid cityId for testing
      const mockCity: City = {
        id: 1,
        name: 'Some City',
        stateId: 1,
        createdAt: new Date(),
        updatedAt: undefined,
      };
      jest.spyOn(prismaService.city, 'findUnique').mockResolvedValue(mockCity);

      const result = await cityService.findCityById(mockCityId);

      expect(result).toEqual(mockCity);
    });
  });
});
