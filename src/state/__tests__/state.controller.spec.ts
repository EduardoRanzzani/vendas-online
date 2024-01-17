import { Test, TestingModule } from '@nestjs/testing';
import { State } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { StateController } from '../state.controller';
import { StateService } from '../state.service';

describe('StateController', () => {
  let controller: StateController;
  let service: StateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StateController],
      providers: [StateService, PrismaService],
    }).compile();

    controller = module.get<StateController>(StateController);
    service = module.get<StateService>(StateService);
  });

  describe('FindAll', () => {
    it('should return an array of states', async () => {
      const expectedResult: State[] = [
        {
          id: 1,
          name: 'Some State',
          uf: 'SS',
          createdAt: new Date(),
          updatedAt: undefined,
        },
      ];

      jest.spyOn(service, 'findAll').mockResolvedValue(expectedResult);

      expect(await controller.findAll()).toBe(expectedResult);
    });
  });
});
