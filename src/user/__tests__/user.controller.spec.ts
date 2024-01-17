import { Test, TestingModule } from '@nestjs/testing';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { UserController } from '../user.controller';
import { UserService } from '../user.service';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService, PrismaService],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  describe('CreateUser', () => {
    it('should create an user', async () => {
      const createProductDTO: Prisma.UserCreateInput = {
        name: 'Some User',
        email: 'someemail@test.com',
        phone: '11123456789',
        cpf: '12345678909',
        password: 'somepass',
      };

      const expectedResult: User = {
        id: 1,
        name: 'Some User',
        email: 'someemail@test.com',
        phone: '11123456789',
        cpf: '12345678909',
        typeUser: 1,
        password: 'somepass',
        createdAt: new Date(),
        updatedAt: undefined,
      };

      jest.spyOn(service, 'create').mockResolvedValue(expectedResult);

      expect(await controller.createUser(createProductDTO)).toBe(
        expectedResult,
      );
    });
  });

  describe('GetAllUsers', () => {
    it('should get all users from database', async () => {
      const result: User[] = [
        {
          id: 1,
          name: 'Some Name',
          email: 'someEmail@test.com',
          phone: '11123456789',
          cpf: '12345678909',
          password: 'somepassword',
          typeUser: 0,
          createdAt: new Date(),
          updatedAt: undefined,
        },
      ];

      jest.spyOn(service, 'findAll').mockResolvedValue(result);
      expect(await controller.getAllUsers()).toEqual(result);
    });
  });

  describe('GetUserById', () => {
    it('should get an user by id', async () => {
      const expectedResult: User = {
        id: 1,
        name: 'Some Name',
        email: 'someemail@test.com',
        password: 'somepassword',
        phone: '11123456789',
        cpf: '12345678909',
        typeUser: 0,
        createdAt: new Date(),
        updatedAt: undefined,
      };

      jest.spyOn(service, 'findById').mockResolvedValue(expectedResult);
      expect(await controller.getUserById(1)).toEqual(expectedResult);
    });
  });

  describe('GetUserByEmail', () => {
    it('should get an user by email', async () => {
      const expectedResult: User = {
        id: 1,
        name: 'Some Name',
        email: 'someemail@test.com',
        password: 'somepassword',
        phone: '11123456789',
        cpf: '12345678909',
        typeUser: 0,
        createdAt: new Date(),
        updatedAt: undefined,
      };

      const email = 'someemail@test.com';

      jest.spyOn(service, 'findByEmail').mockResolvedValue(expectedResult);
      expect(await controller.getUserByEmail(email)).toBe(expectedResult);
    });
  });

  describe('UpdateUser', () => {
    it('should update an user', async () => {
      const expectedResult: User = {
        id: 1,
        name: 'Some Name Updated',
        email: 'someemail@test.com',
        password: 'somepassword',
        phone: '11123456789',
        cpf: '12345678909',
        typeUser: 0,
        createdAt: new Date(),
        updatedAt: undefined,
      };

      const updateUserDTO: Prisma.UserUpdateInput = {
        name: 'Some Name Updated',
      };

      const userId = 1;

      jest.spyOn(service, 'update').mockResolvedValue(expectedResult);
      expect(await controller.updateUser(userId, updateUserDTO)).toBe(
        expectedResult,
      );
    });
  });

  describe('DeleteUser', () => {
    it('should delete an user', async () => {
      const expectedResult: User = {
        id: 1,
        name: 'Some Name',
        email: 'someemail@test.com',
        password: 'somepassword',
        phone: '11123456789',
        cpf: '12345678909',
        typeUser: 0,
        createdAt: new Date(),
        updatedAt: undefined,
      };

      const userId = 1;
      jest.spyOn(service, 'delete').mockResolvedValue(expectedResult);
      expect(await controller.deleteUser(userId)).toBe(expectedResult);
    });
  });
});
