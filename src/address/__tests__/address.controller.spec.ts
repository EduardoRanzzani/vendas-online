import { Test, TestingModule } from '@nestjs/testing';
import { Address, Prisma } from '@prisma/client';
import { CityService } from '../../city/city.service';
import { PrismaService } from '../../prisma/prisma.service';
import { StateService } from '../../state/state.service';
import { UserService } from '../../user/user.service';
import { AddressController } from '../address.controller';
import { AddressService } from '../address.service';

describe('AddressController', () => {
  let controller: AddressController;
  let service: AddressService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AddressController],
      providers: [
        AddressService,
        CityService,
        UserService,
        PrismaService,
        StateService,
      ],
    }).compile();

    controller = module.get<AddressController>(AddressController);
    service = module.get<AddressService>(AddressService);
  });

  describe('create', () => {
    it('should create an address', async () => {
      const createAddressDTO: Prisma.AddressCreateInput = {
        street: 'Some Street',
        numberAddress: 1,
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

      const expectedResult: Address = {
        id: 1,
        street: 'Some Street',
        complement: undefined,
        numberAddress: 1,
        cep: '79000000',
        createdAt: new Date(),
        updatedAt: undefined,
        userId: 1,
        cityId: 1,
      };

      jest
        .spyOn(service, 'createAddress')
        .mockImplementation(async () => expectedResult);

      const result = await controller.create(userId, createAddressDTO);
      expect(result).toBe(expectedResult);
    });
  });

  describe('getAllAddress', () => {
    it('should return an array of addresses', async () => {
      const expectedResult: Address[] = [
        {
          id: 1,
          street: 'Some Street',
          complement: undefined,
          numberAddress: 1,
          cep: '79000000',
          createdAt: new Date(),
          updatedAt: undefined,
          userId: 1,
          cityId: 1,
        },
        {
          id: 2,
          street: 'Some Street 2',
          complement: undefined,
          numberAddress: 2,
          cep: '79000000',
          createdAt: new Date(),
          updatedAt: undefined,
          userId: 1,
          cityId: 1,
        },
      ];

      jest
        .spyOn(service, 'findAllAddress')
        .mockImplementation(async () => expectedResult);

      const result = await controller.getAllAddress();

      expect(result).toBe(expectedResult);
      expect(service.findAllAddress).toHaveBeenCalled();
    });
  });

  describe('getById', () => {
    it('should return an address by ID', async () => {
      const addressId = 1;
      const expectedResult: Address = {
        id: 1,
        street: 'Some Street',
        complement: undefined,
        numberAddress: 1,
        cep: '79000000',
        createdAt: new Date(),
        updatedAt: undefined,
        userId: 1,
        cityId: 1,
      };

      jest
        .spyOn(service, 'findById')
        .mockImplementation(async () => expectedResult);

      const result = await controller.getById(addressId);

      expect(result).toBe(expectedResult);
      expect(service.findById).toHaveBeenCalledWith(addressId);
    });
  });

  describe('getAllAddressByUser', () => {
    it('should return an array of addresses by user ID', async () => {
      const userId = 1;
      const expectedResult: Address[] = [
        {
          id: 1,
          street: 'Some Street',
          complement: undefined,
          numberAddress: 1,
          cep: '79000000',
          createdAt: new Date(),
          updatedAt: undefined,
          userId: 1,
          cityId: 1,
        },
      ];

      jest
        .spyOn(service, 'findAllAddressByUserId')
        .mockImplementation(async () => expectedResult);

      const result = await controller.getAllAddressByUser(userId);

      expect(result).toBe(expectedResult);
      expect(service.findAllAddressByUserId).toHaveBeenCalledWith(userId);
    });
  });

  describe('updateAddress', () => {
    it('should update an address', async () => {
      const addressId = 1;
      const updateAddressDTO: Prisma.AddressUpdateInput = {
        // Provide necessary data for testing
        // ...
      };

      const expectedResult: Address = {
        id: 1,
        street: 'Some Street',
        complement: undefined,
        numberAddress: 1,
        cep: '79000000',
        createdAt: new Date(),
        updatedAt: undefined,
        userId: 1,
        cityId: 1,
      };

      jest
        .spyOn(service, 'updateAddress')
        .mockImplementation(async () => expectedResult);

      const result = await controller.updateAddress(
        addressId,
        updateAddressDTO,
      );

      expect(result).toBe(expectedResult);
      expect(service.updateAddress).toHaveBeenCalledWith(
        addressId,
        updateAddressDTO,
      );
    });
  });

  describe('deleteAddress', () => {
    it('should delete an address', async () => {
      const addressId = 1;
      const expectedResult: Address = {
        id: 1,
        street: 'Some Street',
        complement: undefined,
        numberAddress: 1,
        cep: '79000000',
        createdAt: new Date(),
        updatedAt: undefined,
        userId: 1,
        cityId: 1,
      };

      jest
        .spyOn(service, 'deleteAddress')
        .mockImplementation(async () => expectedResult);

      const result = await controller.deleteAddress(addressId);

      expect(result).toBe(expectedResult);
      expect(service.deleteAddress).toHaveBeenCalledWith(addressId);
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
