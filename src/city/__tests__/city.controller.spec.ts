import { Test, TestingModule } from '@nestjs/testing';
import { City } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { StateService } from '../../state/state.service';
import { CityController } from '../city.controller';
import { CityService } from '../city.service';

describe('CityController', () => {
  let controller: CityController;
  let service: CityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CityController],
      providers: [CityService, PrismaService, StateService],
    }).compile();

    controller = module.get<CityController>(CityController);
    service = module.get<CityService>(CityService);
  });

  describe('FindAll', () => {
    it('should return a list of cities', async () => {
      const expectedResult: City[] = [
        {
          id: 1,
          name: 'Test City',
          createdAt: new Date(),
          updatedAt: undefined,
          stateId: 1,
        },
      ];

      jest
        .spyOn(service, 'findAll')
        .mockImplementation(async () => expectedResult);

      const result = await controller.findAll();
      expect(result).toBe(expectedResult);
    });
  });

  describe('FindAllCitiesFromState', () => {
    it('should return a list of cities that belongs to informed state', async () => {
      const expectedResult: City[] = [
        {
          id: 1,
          name: 'Test City',
          createdAt: new Date(),
          updatedAt: undefined,
          stateId: 1,
        },
      ];

      const stateId = 1;

      jest
        .spyOn(service, 'findAllCitiesFromState')
        .mockImplementation(async () => expectedResult);

      const result = await controller.findAllCitiesFromState(stateId);
      expect(result).toBe(expectedResult);
    });
  });

  describe('FindAllCitiesByName', () => {
    it('should return a list of cities that matches with informed name', async () => {
      const expectedResult: City[] = [
        {
          id: 1,
          name: 'Test City',
          createdAt: new Date(),
          updatedAt: undefined,
          stateId: 1,
        },
      ];

      const name = 'Test City';

      jest
        .spyOn(service, 'findAllCitiesByName')
        .mockImplementation(async () => expectedResult);

      const result = await controller.findAllCitiesByName(name);
      expect(result).toBe(expectedResult);
    });
  });
});
