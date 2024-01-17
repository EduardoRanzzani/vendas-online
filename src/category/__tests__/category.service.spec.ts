import { ConflictException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Category, Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { CategoryService } from '../category.service';

describe('CategoryService', () => {
  let categoryService: CategoryService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoryService, PrismaService],
    }).compile();

    categoryService = module.get<CategoryService>(CategoryService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  describe('createCategory', () => {
    it('should create a new category when category does not exist', async () => {
      // Arrange
      const createCategoryDTO: Prisma.CategoryCreateInput = {
        name: 'Test Name',
      };

      jest
        .spyOn(prismaService.category, 'create')
        .mockResolvedValueOnce(createCategoryDTO as Category);

      const result = await categoryService.create(createCategoryDTO);

      // Assert
      expect(result).toEqual(createCategoryDTO as Category);
    });

    it('should throw ConflictException when category already exists', async () => {
      // Arrange
      const createCategoryDTO: Prisma.CategoryCreateInput = {
        name: 'Test Name',
      };

      jest
        .spyOn(prismaService.category, 'findUnique')
        .mockResolvedValue(createCategoryDTO as Category);

      // Act & Assert
      await expect(categoryService.create(createCategoryDTO)).rejects.toThrow(
        ConflictException,
      );
    });
  });

  describe('findAllCategories', () => {
    it('should return an array of all categories', async () => {
      // Arrange
      const categories: Category[] = [
        {
          id: 1,
          name: 'Test Name',
          createdAt: new Date(),
          updatedAt: null,
        },
      ];

      jest
        .spyOn(prismaService.category, 'findMany')
        .mockResolvedValue(categories);

      const result = await categoryService.findAll();

      // Assert
      expect(result).toEqual(categories);
    });

    it('should throw NotFoundException when no categories are found', async () => {
      // Arrange
      jest.spyOn(prismaService.category, 'findMany').mockResolvedValue(null);

      // Act & Assert
      await expect(categoryService.findAll()).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('findCategoryById', () => {
    it('should return a category when category is found', async () => {
      // Arrange
      const category: Category = {
        id: 1,
        name: 'Test Name',
        createdAt: new Date(),
        updatedAt: null,
      };

      jest
        .spyOn(prismaService.category, 'findUnique')
        .mockResolvedValue(category);

      const result = await categoryService.findById(1);

      // Assert
      expect(result).toEqual(category);
    });

    it('should throw NotFoundException when category is not found', async () => {
      // Arrange
      jest.spyOn(prismaService.category, 'findUnique').mockResolvedValue(null);

      // Act & Assert
      await expect(categoryService.findById(1)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('findCategoryByName', () => {
    it('should return a category when category is found', async () => {
      // Arrange
      const category: Category = {
        id: 1,
        name: 'Test Name',
        createdAt: new Date(),
        updatedAt: null,
      };

      jest
        .spyOn(prismaService.category, 'findUnique')
        .mockResolvedValue(category);

      const result = await categoryService.findByName('Test Name');

      // Assert
      expect(result).toEqual(category);
    });

    it('should throw NotFoundException when category is not found', async () => {
      // Arrange
      jest.spyOn(prismaService.category, 'findUnique').mockResolvedValue(null);

      // Act & Assert
      await expect(categoryService.findByName('Test Name')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('updateCategory', () => {
    it('should update a category when category is found', async () => {
      // Arrange
      const updateCategoryDTO: Prisma.CategoryUpdateInput = {
        name: 'Test Name',
      };

      const category: Category = {
        id: 1,
        name: 'Test Name',
        createdAt: new Date(),
        updatedAt: null,
      };

      jest
        .spyOn(prismaService.category, 'findUnique')
        .mockResolvedValue(category);

      jest
        .spyOn(prismaService.category, 'update')
        .mockResolvedValue(category as Category);

      const result = await categoryService.update(1, updateCategoryDTO);

      // Assert
      expect(result).toEqual(category);
    });

    it('should throw NotFoundException when category is not found', async () => {
      // Arrange
      const updateCategoryDTO: Prisma.CategoryUpdateInput = {
        name: 'Test Name',
      };

      jest.spyOn(prismaService.category, 'findUnique').mockResolvedValue(null);

      // Act & Assert
      await expect(
        categoryService.update(1, updateCategoryDTO),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('removeCategory', () => {
    it('should remove a category when category is found', async () => {
      // Arrange
      const category: Category = {
        id: 1,
        name: 'Test Name',
        createdAt: new Date(),
        updatedAt: null,
      };

      jest
        .spyOn(prismaService.category, 'findUnique')
        .mockResolvedValue(category);

      jest
        .spyOn(prismaService.category, 'delete')
        .mockResolvedValue(category as Category);

      const result = await categoryService.remove(1);

      // Assert
      expect(result).toEqual(category);
    });

    it('should throw NotFoundException when category is not found', async () => {
      // Arrange
      jest.spyOn(prismaService.category, 'findUnique').mockResolvedValue(null);

      // Act & Assert
      await expect(categoryService.remove(1)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
