import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Cart, Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { UserService } from '../../user/user.service';
import { CartService } from '../cart.service';

describe('CartService', () => {
  let service: CartService;
  let prismaService: PrismaService;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CartService, PrismaService, UserService],
    }).compile();

    service = module.get<CartService>(CartService);
    prismaService = module.get<PrismaService>(PrismaService);
    userService = module.get<UserService>(UserService);
  });

  describe('CreateCart', () => {
    it('should create a new cart when cart does not exist', async () => {
      // Mocking dependencies
      jest.spyOn(userService, 'findById').mockResolvedValueOnce({
        id: 1,
        name: 'Some Name',
        email: 'someemail@test.com',
        phone: '67123456789',
        cpf: '12345678909',
        password: 'somepassword',
        typeUser: 1,
        createdAt: new Date(),
        updatedAt: null,
      });

      // Arrange
      const createCartDTO: Prisma.CartCreateInput = {
        user: {
          connect: {
            id: 1,
          },
        },
      };

      jest
        .spyOn(prismaService.cart, 'create')
        .mockResolvedValueOnce(createCartDTO as unknown as Cart);

      const userId = 1;

      const result = await service.create(userId, createCartDTO);

      // Assert
      expect(result).toEqual(createCartDTO as unknown as Cart);
    });
  });

  describe('FindAll', () => {
    it('should return an array of all carts', async () => {
      // Arrange
      const mockedCarts: Cart[] = [
        {
          id: 1,
          userId: 1,
          active: true,
          createdAt: new Date(),
          updatedAt: null,
        },
      ];

      jest
        .spyOn(prismaService.cart, 'findMany')
        .mockResolvedValue(mockedCarts as Cart[]);

      const result = await service.findAll();

      // Assert
      expect(result).toEqual(mockedCarts as Cart[]);
    });

    it('should throw NotFoundException when no carts are found', async () => {
      // Arrange
      jest.spyOn(prismaService.cart, 'findMany').mockResolvedValue(null);

      // Act & Assert
      await expect(service.findAll()).rejects.toThrow();
    });
  });

  describe('FindById', () => {
    it('should return a specific cart by ID', async () => {
      // Arrange
      const mockedCart: Cart = {
        id: 1,
        userId: 1,
        active: true,
        createdAt: new Date(),
        updatedAt: null,
      };

      jest
        .spyOn(prismaService.cart, 'findUnique')
        .mockResolvedValue(mockedCart as Cart);

      const cartId = 1;

      const result = await service.findById(cartId);

      // Assert
      expect(result).toEqual(mockedCart as Cart);
    });

    it('should throw NotFoundException if cart is not found', async () => {
      // Arrange
      jest.spyOn(prismaService.cart, 'findUnique').mockResolvedValue(null);

      const cartId = 1;

      await expect(service.findById(cartId)).rejects.toThrow();
    });
  });

  describe('FindAllActive', () => {
    it('should return an array of all active carts', async () => {
      // Arrange
      const mockedCarts: Cart[] = [
        {
          id: 1,
          userId: 1,
          active: true,
          createdAt: new Date(),
          updatedAt: null,
        },
      ];

      jest.spyOn(prismaService.cart, 'findMany').mockResolvedValue(mockedCarts);

      const result = await service.findAllActive();

      // Assert
      expect(result).toEqual(mockedCarts);
    });

    it('should throw NotFoundException when no active carts are found', async () => {
      // Arrange
      jest.spyOn(prismaService.cart, 'findMany').mockResolvedValue(null);
      // Act & Assert
      await expect(service.findAllActive()).rejects.toThrow();
    });
  });

  describe('FindAllInactive', () => {
    it('should return an array of all inactive carts', async () => {
      // Arrange
      const mockedCarts: Cart[] = [
        {
          id: 1,
          userId: 1,
          active: false,
          createdAt: new Date(),
          updatedAt: null,
        },
      ];

      jest.spyOn(prismaService.cart, 'findMany').mockResolvedValue(mockedCarts);

      const result = await service.findAllInactive();

      // Assert
      expect(result).toEqual(mockedCarts);
    });

    it('should throw NotFoundException when no inactive carts are found', async () => {
      // Arrange
      jest.spyOn(prismaService.cart, 'findMany').mockResolvedValue(null);
      // Act & Assert
      await expect(service.findAllInactive()).rejects.toThrow();
    });
  });

  describe('Update', () => {
    it('should update a specific cart by ID', async () => {
      // Mocking dependencies
      jest.spyOn(userService, 'findById').mockResolvedValueOnce({
        id: 1,
        name: 'Some Name',
        email: 'someemail@test.com',
        phone: '67123456789',
        cpf: '12345678909',
        password: 'somepassword',
        typeUser: 1,
        createdAt: new Date(),
        updatedAt: null,
      });

      const mockedCart: Cart = {
        id: 1,
        userId: 1,
        active: true,
        createdAt: new Date(),
        updatedAt: null,
      };

      jest.spyOn(service, 'findById').mockResolvedValueOnce({
        id: 1,
        userId: 1,
        active: true,
        createdAt: new Date(),
        updatedAt: null,
      });

      const updateCartDTO: Prisma.CartUpdateInput = {
        user: {
          connect: {
            id: 1,
          },
        },
      };
      jest.spyOn(prismaService.cart, 'update').mockResolvedValue(mockedCart);
      const cartId = 1;
      const result = await service.update(cartId, updateCartDTO);
      // Assert
      expect(result).toEqual(mockedCart);
    });

    it('should throw NotFoundException if cart is not found', async () => {
      // Arrange
      jest
        .spyOn(prismaService.cart, 'update')
        .mockRejectedValue(NotFoundException);
      const cartId = 1;
      await expect(service.update(cartId, {} as any)).rejects.toThrow();
    });
  });

  describe('Remove', () => {
    it('should remove a specific cart by ID', async () => {
      // Mocking dependencies
      jest.spyOn(service, 'findById').mockResolvedValueOnce({
        id: 1,
        userId: 1,
        active: true,
        createdAt: new Date(),
        updatedAt: null,
      });

      // Arrange
      const mockedCart: Cart = {
        id: 1,
        userId: 1,
        active: true,
        createdAt: new Date(),
        updatedAt: null,
      };

      jest.spyOn(prismaService.cart, 'delete').mockResolvedValue(mockedCart);

      const cartId = 1;

      const result = await service.remove(cartId);

      // Assert
      expect(result).toEqual(mockedCart);
    });

    it('should throw NotFoundException if cart is not found', async () => {
      // Arrange
      jest
        .spyOn(prismaService.cart, 'delete')
        .mockRejectedValue(NotFoundException);
      const cartId = 1;
      await expect(service.remove(cartId)).rejects.toThrow();
    });
  });

  describe('VerifyActiveCart', () => {
    it('should return a specific cart by userId', async () => {
      // Mocking Dependencies
      jest.spyOn(service, 'verifyActiveCart').mockResolvedValue({
        id: 1,
        userId: 1,
        active: true,
        createdAt: new Date(),
        updatedAt: null,
      });

      // Arrange
      const mockedCart: Cart = {
        id: 1,
        userId: 1,
        active: true,
        createdAt: new Date(),
        updatedAt: null,
      };
      jest.spyOn(prismaService.cart, 'findFirst').mockResolvedValue(mockedCart);
      const userId = 1;
      const result = await service.verifyActiveCart(userId);
      // Assert
      expect(result).toEqual(mockedCart);
    });

    it('should throw NotFoundException if cart is not found', async () => {
      // Arrange
      jest
        .spyOn(prismaService.cart, 'findFirst')
        .mockRejectedValue(NotFoundException);
      const userId = 1;
      await expect(service.verifyActiveCart(userId)).rejects.toThrow();
    });
  });
});
