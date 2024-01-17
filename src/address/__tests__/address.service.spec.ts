import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Prisma } from '@prisma/client';
import { CityService } from '../../city/city.service';
import { PrismaService } from '../../prisma/prisma.service';
import { StateService } from '../../state/state.service';
import { UserService } from '../../user/user.service';
import { AddressService } from '../address.service';

describe('AddressService', () => {
  let addressService: AddressService;
  let prismaService: PrismaService;
  let userService: UserService;
  let cityService: CityService;
  let stateService: StateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AddressService,
        PrismaService,
        UserService,
        CityService,
        StateService,
      ],
    }).compile();

    addressService = module.get<AddressService>(AddressService);
    prismaService = module.get<PrismaService>(PrismaService);
    userService = module.get<UserService>(UserService);
    cityService = module.get<CityService>(CityService);
    stateService = module.get<StateService>(StateService);
  });

  it('should be defined', () => {
    expect(addressService).toBeDefined();
  });

  describe('createAddress', () => {
    it('should create an address', async () => {
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
      }); // Adjust as needed
      jest.spyOn(cityService, 'findCityById').mockResolvedValueOnce({
        id: 1,
        name: 'Some City',
        createdAt: new Date(),
        updatedAt: null,
        stateId: 1,
      }); // Adjust as needed
      jest.spyOn(stateService, 'findStateById').mockResolvedValueOnce({
        id: 1,
        name: 'Some State',
        uf: 'SS',
        createdAt: new Date(),
        updatedAt: null,
      }); // Adjust as needed

      jest
        .spyOn(prismaService.address, 'create')
        .mockResolvedValueOnce({} as any);

      const createAddressDTO: Prisma.AddressCreateInput = {
        street: 'Some address',
        numberAddress: 123,
        cep: '79000000',
        user: {
          connect: {
            id: 1,
          },
        },
        city: {
          connect: {
            id: 1,
          },
        },
      };

      const userId = 1;

      const result = await addressService.createAddress(
        createAddressDTO,
        userId,
      );

      expect(result).toBeDefined();
      // Add more assertions based on your requirements
    });
  });

  describe('findAllAddress', () => {
    it('should return an array of addresses', async () => {
      jest
        .spyOn(prismaService.address, 'findMany')
        .mockResolvedValueOnce([{}] as any);

      const result = await addressService.findAllAddress();

      expect(result).toBeDefined();
    });
  });

  describe('findById', () => {
    it('should return a specific address by ID', async () => {
      jest
        .spyOn(prismaService.address, 'findUnique')
        .mockResolvedValueOnce({} as any);

      const addressId = 1;

      const result = await addressService.findById(addressId);

      expect(result).toBeDefined();
      // Add more assertions based on your requirements
    });

    it('should throw NotFoundException if address is not found', async () => {
      jest
        .spyOn(prismaService.address, 'findUnique')
        .mockResolvedValueOnce(null);

      const addressId = 1;

      await expect(addressService.findById(addressId)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('findAllAddressByUserId', () => {
    it('should return an array of addresses for a specific user ID', async () => {
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
      }); // User found
      jest
        .spyOn(prismaService.address, 'findMany')
        .mockResolvedValueOnce([{}] as any);

      const userId = 1;

      const result = await addressService.findAllAddressByUserId(userId);

      expect(result).toBeDefined();
      // Add more assertions based on your requirements
    });
  });

  describe('updateAddress', () => {
    it('should update a specific address by ID', async () => {
      jest
        .spyOn(prismaService.address, 'update')
        .mockResolvedValueOnce({} as any);
      jest
        .spyOn(prismaService.address, 'findUnique')
        .mockResolvedValueOnce({} as any);

      const addressId = 1;
      const updateDTO: Prisma.AddressUpdateInput = {
        // ... provide necessary data for testing
      };

      const result = await addressService.updateAddress(addressId, updateDTO);

      expect(result).toBeDefined();
      // Add more assertions based on your requirements
    });

    it('should throw NotFoundException if address is not found', async () => {
      jest
        .spyOn(prismaService.address, 'findUnique')
        .mockResolvedValueOnce(null);

      const addressId = 1;
      const updateDTO: Prisma.AddressUpdateInput = {
        street: 'Address updated',
      };

      await expect(
        addressService.updateAddress(addressId, updateDTO),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('deleteAddress', () => {
    it('should delete a specific address by ID', async () => {
      jest
        .spyOn(prismaService.address, 'delete')
        .mockResolvedValueOnce({} as any);
      jest
        .spyOn(prismaService.address, 'findUnique')
        .mockResolvedValueOnce({} as any);

      const addressId = 1;

      const result = await addressService.deleteAddress(addressId);

      expect(result).toBeDefined();
    });

    it('should throw NotFoundException if address is not found', async () => {
      jest
        .spyOn(prismaService.address, 'findUnique')
        .mockResolvedValueOnce(null);

      const addressId = 1;

      await expect(addressService.deleteAddress(addressId)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
