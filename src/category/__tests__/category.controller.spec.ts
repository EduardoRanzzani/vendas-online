import { Test, TestingModule } from '@nestjs/testing';
import { Category } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { CategoryController } from '../category.controller';
import { CategoryService } from '../category.service';

describe('CategoryController', () => {
  let controller: CategoryController;
  let service: CategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryController],
      providers: [CategoryService, PrismaService],
    }).compile();

    controller = module.get<CategoryController>(CategoryController);
    service = module.get<CategoryService>(CategoryService);
  });

  describe('Create', () => {
    it('should create a new category', async () => {
      const mockCategory = {
        name: 'Category',
      };

      const expectedResult: Category = {
        id: 1,
        name: 'Category',
        createdAt: new Date(),
        updatedAt: undefined,
      };

      jest
        .spyOn(service, 'create')
        .mockImplementation(async () => expectedResult);

      const result = await controller.create(mockCategory);
      expect(result).toBe(expectedResult);
    });
  });

  describe('FindAll', () => {
    it('should return all categories', async () => {
      const expectedResult: Category[] = [
        {
          id: 1,
          name: 'Category',
          createdAt: new Date(),
          updatedAt: undefined,
        },
      ];

      jest
        .spyOn(service, 'findAll')
        .mockImplementation(async () => expectedResult);

      const result = await controller.findAll();
      expect(result).toBe(expectedResult);
    });
  });

  describe('FindOne', () => {
    it('should return one category', async () => {
      const expectedResult: Category = {
        id: 1,
        name: 'Category',
        createdAt: new Date(),
        updatedAt: undefined,
      };

      jest
        .spyOn(service, 'findById')
        .mockImplementation(async () => expectedResult);

      const result = await controller.findOne(1);
      expect(result).toBe(expectedResult);
    });
  });

  describe('Update', () => {
    it('should update a category', async () => {
      const mockCategory = {
        name: 'Category',
      };

      const expectedResult: Category = {
        id: 1,
        name: 'Category',
        createdAt: new Date(),
        updatedAt: undefined,
      };

      jest
        .spyOn(service, 'update')
        .mockImplementation(async () => expectedResult);

      const result = await controller.update(1, mockCategory);
      expect(result).toBe(expectedResult);
    });
  });

  describe('Remove', () => {
    it('should remove a category', async () => {
      const expectedResult: Category = {
        id: 1,
        name: 'Category',
        createdAt: new Date(),
        updatedAt: undefined,
      };

      jest
        .spyOn(service, 'remove')
        .mockImplementation(async () => expectedResult);

      const result = await controller.remove(1);
      expect(result).toBe(expectedResult);
    });
  });
});
