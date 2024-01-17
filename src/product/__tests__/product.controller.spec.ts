import { Test, TestingModule } from '@nestjs/testing';
import { Prisma, Product } from '@prisma/client';
import { CategoryService } from '../../category/category.service';
import { PrismaService } from '../../prisma/prisma.service';
import { ProductController } from '../product.controller';
import { ProductService } from '../product.service';

describe('ProductController', () => {
  let controller: ProductController;
  let service: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [ProductService, PrismaService, CategoryService],
    }).compile();

    controller = module.get<ProductController>(ProductController);
    service = module.get<ProductService>(ProductService);
  });

  describe('Create', () => {
    it('should create a product', async () => {
      const createProductDTO: Prisma.ProductCreateInput = {
        name: 'Some Product',
        price: 1,
        image: 'some-link-for-image',
        category: {
          connect: {
            id: 1,
          },
        },
      };

      const expectedResult: Product = {
        id: 1,
        name: 'Some Product',
        image: 'some-link-for-image',
        price: 1,
        createdAt: new Date(),
        updatedAt: undefined,
        categoryId: 1,
      };

      const categoryId = 1;

      jest.spyOn(service, 'create').mockResolvedValue(expectedResult);

      expect(await controller.create(categoryId, createProductDTO)).toBe(
        expectedResult,
      );
    });
  });

  describe('FindAll', () => {
    it('should return an array of products', async () => {
      const expectedResult: Product[] = [
        {
          id: 1,
          name: 'Some Product',
          image: 'some-link-for-image',
          price: 1,
          createdAt: new Date(),
          updatedAt: undefined,
          categoryId: 1,
        },
      ];

      jest.spyOn(service, 'findAll').mockResolvedValue(expectedResult);

      expect(await controller.findAll()).toBe(expectedResult);
    });
  });

  describe('FindById', () => {
    it('should return a product', async () => {
      const expectedResult: Product = {
        id: 1,
        name: 'Some Product',
        image: 'some-link-for-image',
        price: 1,
        createdAt: new Date(),
        updatedAt: undefined,
        categoryId: 1,
      };

      const productId = 1;

      jest.spyOn(service, 'findById').mockResolvedValue(expectedResult);

      expect(await controller.findOne(productId)).toBe(expectedResult);
    });
  });

  describe('Update', () => {
    it('should update a product', async () => {
      const updateProductDTO: Prisma.ProductUpdateInput = {
        name: 'Some Product',
        price: 1,
        image: 'some-link-for-image',
        category: {
          connect: {
            id: 1,
          },
        },
      };

      const expectedResult: Product = {
        id: 1,
        name: 'Some Product',
        image: 'some-link-for-image',
        price: 1,
        createdAt: new Date(),
        updatedAt: undefined,
        categoryId: 1,
      };

      const productId = 1;

      jest.spyOn(service, 'update').mockResolvedValue(expectedResult);
      expect(await controller.update(productId, updateProductDTO)).toBe(
        expectedResult,
      );
    });
  });

  describe('Remove', () => {
    it('should remove a product', async () => {
      const expectedResult: Product = {
        id: 1,
        name: 'Some Product',
        image: 'some-link-for-image',
        price: 1,
        createdAt: new Date(),
        updatedAt: undefined,
        categoryId: 1,
      };

      const productId = 1;

      jest.spyOn(service, 'remove').mockResolvedValue(expectedResult);
      expect(await controller.remove(productId)).toBe(expectedResult);
    });
  });
});
