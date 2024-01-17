import { ConflictException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { UserService } from '../user.service';

describe('UserService', () => {
  let userService: UserService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, PrismaService],
    }).compile();

    userService = module.get<UserService>(UserService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  describe('createUser', () => {
    it('should create a new user when user does not exist', async () => {
      // Arrange
      const createUserDTO: Prisma.UserCreateInput = {
        email: 'test@example.com',
        password: 'password',
        name: 'Test Name',
        phone: '12345678',
        cpf: '12345678909',
      };

      jest
        .spyOn(prismaService.user, 'create')
        .mockResolvedValue(createUserDTO as User);

      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(null);

      // Act
      const result = await userService.create(createUserDTO);

      // Assert
      expect(result).toEqual(createUserDTO as User);
    });

    it('should throw ConflictException when user already exists', async () => {
      // Arrange
      const createUserDTO: Prisma.UserCreateInput = {
        email: 'test@example.com',
        password: 'password',
        name: 'Test Name',
        phone: '12345678',
        cpf: '12345678909',
      };

      jest
        .spyOn(prismaService.user, 'findUnique')
        .mockResolvedValue(createUserDTO as User);

      // Act & Assert
      await expect(userService.create(createUserDTO)).rejects.toThrow(
        ConflictException,
      );
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      // Arrange
      const mockUsers: User[] = [
        {
          id: 1,
          email: 'test@example.com',
          password: 'password',
          name: 'Test Name',
          phone: '12345678',
          cpf: '12345678909',
          typeUser: 1,
          createdAt: new Date(),
          updatedAt: null,
        },
      ];

      jest.spyOn(prismaService.user, 'findMany').mockResolvedValue(mockUsers);

      // Act
      const result = await userService.findAll();

      // Assert
      expect(result).toEqual(mockUsers);
    });
  });

  describe('findUserById', () => {
    it('should return a user when given a valid userId', async () => {
      // Arrange
      const userId = 1;
      const mockUser: User = {
        id: 1,
        email: 'test@example.com',
        password: 'password',
        name: 'Test Name',
        phone: '12345678',
        cpf: '12345678909',
        typeUser: 1,
        createdAt: new Date(),
        updatedAt: null,
      };

      jest.spyOn(prismaService.user, 'findFirst').mockResolvedValue(mockUser);

      // Act
      const result = await userService.findById(userId);

      // Assert
      expect(result).toEqual(mockUser);
    });

    it('should throw NotFoundException when user with given userId does not exist', async () => {
      // Arrange
      const userId = 1;

      jest.spyOn(prismaService.user, 'findFirst').mockResolvedValue(null);

      // Act & Assert
      await expect(userService.findById(userId)).rejects.toThrowError(
        NotFoundException,
      );
    });
  });

  describe('findUserByEmail', () => {
    it('should return a user when given a valid email', async () => {
      // Arrange
      const userEmail = 'test@example.com';
      const mockUser: User = {
        id: 1,
        email: 'test@example.com',
        password: 'password',
        name: 'Test Name',
        phone: '12345678',
        cpf: '12345678909',
        typeUser: 1,
        createdAt: new Date(),
        updatedAt: null,
      };

      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(mockUser);

      // Act
      const result = await userService.findByEmail(userEmail);

      // Assert
      expect(result).toEqual(mockUser);
    });

    it('should throw NotFoundException when user with given email does not exist', async () => {
      // Arrange
      const userEmail = 'nonexistent@example.com';

      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(null);

      // Act & Assert
      await expect(userService.findByEmail(userEmail)).rejects.toThrowError(
        NotFoundException,
      );
    });
  });
});
