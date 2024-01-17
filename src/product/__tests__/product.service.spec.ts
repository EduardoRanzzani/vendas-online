import { ConflictException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Prisma } from '@prisma/client';
import { CategoryService } from '../../category/category.service';
import { PrismaService } from '../../prisma/prisma.service';
import { ProductService } from '../product.service';

describe('ProductService', () => {
  let productService: ProductService;
  let prismaService: PrismaService;
  let categoryService: CategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductService, PrismaService, CategoryService],
    }).compile();

    productService = module.get<ProductService>(ProductService);
    prismaService = module.get<PrismaService>(PrismaService);
    categoryService = module.get<CategoryService>(CategoryService);
  });

  describe('createProduct', () => {
    it('should create a new product when product does not exist', async () => {
      // Mocking dependencies
      jest.spyOn(categoryService, 'findById').mockResolvedValueOnce({
        id: 1,
        name: 'Some Category',
        createdAt: new Date(),
        updatedAt: null,
      });

      // Arrange
      const createProductDTO: Prisma.ProductCreateInput = {
        name: 'Test Name',
        price: 10,
        image: 'Test Image',
        category: { connect: { id: 1 } },
      };

      jest
        .spyOn(prismaService.product, 'create')
        .mockResolvedValueOnce(createProductDTO as any);

      const categoryId = 1;

      const result = await productService.create(categoryId, createProductDTO);

      // Assert
      expect(result).toEqual(createProductDTO as any);
    });

    it('should throw ConflictException when product already exists', async () => {
      // Mocking dependencies
      jest.spyOn(categoryService, 'findById').mockResolvedValueOnce({
        id: 1,
        name: 'Some Category',
        createdAt: new Date(),
        updatedAt: null,
      });

      // Arrange
      const createProductDTO: Prisma.ProductCreateInput = {
        name: 'Test Name',
        price: 10,
        image: 'Test Image',
        category: { connect: { id: 1 } },
      };

      const categoryId = 1;

      jest
        .spyOn(prismaService.product, 'findUnique')
        .mockResolvedValue(createProductDTO as any);

      // Act & Assert
      await expect(
        productService.create(categoryId, createProductDTO),
      ).rejects.toThrow(ConflictException);
    });
  });

  describe('findAll', () => {
    it('should return an array of products', async () => {
      // Arrange
      const mockProducts: Prisma.ProductCreateInput[] = [
        {
          name: 'Test Name',
          price: 10,
          image: 'Test Image',
          category: { connect: { id: 1 } },
        },
      ];

      jest
        .spyOn(prismaService.product, 'findMany')
        .mockResolvedValue(mockProducts as any);

      const result = await productService.findAll();

      // Assert
      expect(result).toEqual(mockProducts as any);
    });

    it('should throw NotFoundException when no products are found', async () => {
      // Arrange
      jest.spyOn(prismaService.product, 'findMany').mockResolvedValue(null);

      // Act & Assert
      await expect(productService.findAll()).rejects.toThrow(NotFoundException);
    });
  });

  describe('findById', () => {
    it('should return a specific product by ID', async () => {
      // Arrange
      const mockProduct: Prisma.ProductCreateInput = {
        name: 'Test Name',
        price: 10,
        image: 'Test Image',
        category: { connect: { id: 1 } },
      };

      jest
        .spyOn(prismaService.product, 'findUnique')
        .mockResolvedValue(mockProduct as any);

      const productId = 1;

      const result = await productService.findById(productId);

      // Assert
      expect(result).toEqual(mockProduct as any);
    });

    it('should throw NotFoundException if product is not found', async () => {
      // Arrange
      jest.spyOn(prismaService.product, 'findUnique').mockResolvedValue(null);

      const productId = 1;

      // Act & Assert
      await expect(productService.findById(productId)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('findByName', () => {
    it('should return a specific product by name', async () => {
      // Arrange
      const mockProduct: Prisma.ProductCreateInput = {
        name: 'Test Name',
        price: 10,
        image: 'Test Image',
        category: { connect: { id: 1 } },
      };

      jest
        .spyOn(prismaService.product, 'findUnique')
        .mockResolvedValue(mockProduct as any);

      const productName = 'Test Name';

      const result = await productService.findByName(productName);

      // Assert
      expect(result).toEqual(mockProduct as any);
    });

    it('should throw NotFoundException if product is not found', async () => {
      // Arrange
      jest.spyOn(prismaService.product, 'findUnique').mockResolvedValue(null);

      const productName = 'Test Name';

      // Act & Assert
      await expect(productService.findByName(productName)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('updateProduct', () => {
    it('should update a product when product exists', async () => {
      // Arrange
      const updateProductDTO: Prisma.ProductUpdateInput = {
        name: 'Test Name',
        price: 10,
        image: 'Test Image',
      };

      jest
        .spyOn(prismaService.product, 'update')
        .mockResolvedValue(updateProductDTO as any);

      const productId = 1;

      const result = await productService.update(productId, updateProductDTO);

      // Assert
      expect(result).toEqual(updateProductDTO as any);
    });

    it('should throw NotFoundException when product is not found', async () => {
      // Arrange
      const updateProductDTO: Prisma.ProductUpdateInput = {
        name: 'Test Name',
        price: 10,
        image: 'Test Image',
      };

      jest.spyOn(prismaService.product, 'findUnique').mockResolvedValue(null);
      jest.spyOn(prismaService.product, 'update').mockResolvedValue(null);

      const productId = 1;

      // Act & Assert
      await expect(
        productService.update(productId, updateProductDTO),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should delete a specific product by ID', async () => {
      // Arrange
      const mockProduct: Prisma.ProductCreateInput = {
        name: 'Test Name',
        price: 10,
        image: 'Test Image',
        category: { connect: { id: 1 } },
      };

      jest
        .spyOn(prismaService.product, 'findUnique')
        .mockResolvedValue(mockProduct as any);

      jest
        .spyOn(prismaService.product, 'delete')
        .mockResolvedValue(mockProduct as any);

      const productId = 1;

      const result = await productService.remove(productId);

      // Assert
      expect(result).toEqual(mockProduct as any);
    });

    it('should throw NotFoundException if product is not found', async () => {
      // Arrange
      jest.spyOn(prismaService.product, 'findUnique').mockResolvedValue(null);

      const productId = 1;

      // Act & Assert
      await expect(productService.remove(productId)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
