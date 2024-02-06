import { Test, TestingModule } from '@nestjs/testing';
import { Cart, Cartproducts } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { UserService } from '../../user/user.service';
import { CartController } from '../cart.controller';
import { CartService } from '../cart.service';
import { IncludeProductDTO } from '../dto/include-product.dto';

describe('CartController', () => {
  let controller: CartController;
  let service: CartService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CartController],
      providers: [CartService, PrismaService, UserService],
    }).compile();

    controller = module.get<CartController>(CartController);
    service = module.get<CartService>(CartService);
  });

  describe('AddProductsInCart', () => {
    it('should add products in an existent cart', async () => {
      const mockProducts: IncludeProductDTO = {
        productId: 1,
        amount: 1,
      };

      const userId = 1;

      const expectedResult: Cartproducts = {
        id: 1,
        cartId: 1,
        productId: 1,
        amount: 1,
      };

      jest
        .spyOn(service, 'addProductsInCart')
        .mockImplementation(async () => expectedResult);

      const result = await controller.addProductsInCart(userId, mockProducts);
      expect(result).toBe(expectedResult);
    });
  });

  describe('RemoveProductsFromCart', () => {
    it('should remove products from an existent cart', async () => {
      const mockProducts: IncludeProductDTO = {
        productId: 1,
        amount: 1,
      };

      const userId = 1;

      const expectedResult: Cartproducts = {
        id: 1,
        cartId: 1,
        productId: 1,
        amount: 1,
      };

      jest
        .spyOn(service, 'removeProductsFromCart')
        .mockImplementation(async () => expectedResult);

      const result = await controller.removeProductsFromCart(
        userId,
        mockProducts,
      );
      expect(result).toBe(expectedResult);
    });
  });

  describe('FindAll', () => {
    it('should return an array of carts', async () => {
      const expectedResult: Cart[] = [
        {
          id: 1,
          userId: 1,
          active: true,
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
    it('should return a cart', async () => {
      const expectedResult: Cart = {
        id: 1,
        userId: 1,
        active: true,
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
    it('should update a cart', async () => {
      const mockCart: Cart = {
        id: 1,
        userId: 1,
        active: true,
        createdAt: new Date(),
        updatedAt: undefined,
      };

      const expectedResult: Cart = {
        id: 1,
        userId: 1,
        active: false,
        createdAt: new Date(),
        updatedAt: undefined,
      };

      jest
        .spyOn(service, 'update')
        .mockImplementation(async () => expectedResult);

      const result = await controller.update(1, mockCart);
      expect(result).toBe(expectedResult);
    });
  });

  describe('Remove', () => {
    it('should remove a cart', async () => {
      const expectedResult: Cart = {
        id: 1,
        userId: 1,
        active: true,
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
