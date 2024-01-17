import { Test, TestingModule } from '@nestjs/testing';
import { State } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { StateService } from '../state.service';

describe('StateService', () => {
  let stateService: StateService;
  let prismaServiceMock: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StateService,
        {
          provide: PrismaService,
          useValue: {
            state: {
              findMany: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    stateService = module.get<StateService>(StateService);
    prismaServiceMock = module.get<PrismaService>(PrismaService);
  });

  describe('findPaginated', () => {
    it('should return an array of states', async () => {
      const mockStates: State[] = [
        {
          id: 1,
          name: 'State 1',
          uf: 'ST1',
          createdAt: new Date(),
          updatedAt: null,
        },
        {
          id: 2,
          name: 'State 2',
          uf: 'ST2',
          createdAt: new Date(),
          updatedAt: null,
        },
      ];

      jest
        .spyOn(prismaServiceMock.state, 'findMany')
        .mockResolvedValueOnce(mockStates);

      const result = await stateService.findPaginated({
        skip: 0,
        take: 10,
        cursor: { id: 0 },
        where: { name: 'SomeState' },
        orderBy: { name: 'asc' },
      });

      expect(result).toEqual(mockStates);
      expect(prismaServiceMock.state.findMany).toHaveBeenCalledWith({
        skip: 0,
        take: 10,
        cursor: { id: 0 },
        where: { name: 'SomeState' },
        orderBy: { name: 'asc' },
      });
    });
  });

  describe('findAll', () => {
    it('should return an array of states', async () => {
      const mockStateList: State[] = [
        {
          id: 1,
          name: 'State 1',
          uf: 'ST1',
          createdAt: new Date(),
          updatedAt: null,
        },
        {
          id: 2,
          name: 'State 2',
          uf: 'ST2',
          createdAt: new Date(),
          updatedAt: null,
        },
      ];

      jest
        .spyOn(prismaServiceMock.state, 'findMany')
        .mockResolvedValueOnce(mockStateList);

      const result = await stateService.findAll();

      expect(result).toEqual(mockStateList);
      expect(prismaServiceMock.state.findMany).toHaveBeenCalledWith();
    });
  });
});
