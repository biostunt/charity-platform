import { Test } from '@nestjs/testing';
import { AccountRoleRepository } from '../../infrastructure/database/account-role.repository';
import { AccountRoleNotFoundException } from '../../infrastructure/exceptions/account-role-not-found.exception';
import { GetAccountRoleByIdService } from './get-account-role-by-id.service';

const mockAccountRoleRepository = {
  getById: jest.fn(),
};

describe('GetAccountRoleByIdService', () => {
  let service: GetAccountRoleByIdService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [GetAccountRoleByIdService, { provide: AccountRoleRepository, useValue: mockAccountRoleRepository }],
    }).compile();
    service = moduleRef.get(GetAccountRoleByIdService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('#handle()', () => {
    it('should throw error if account role not found by id', async () => {
      const id = 'test';
      jest.spyOn(mockAccountRoleRepository, 'getById').mockResolvedValue(null);
      try {
        await service.handle({ id });
        expect(true).toBe(false);
      } catch (err) {
        expect(err).toBeInstanceOf(AccountRoleNotFoundException);
        expect(mockAccountRoleRepository.getById).toBeCalledWith(id);
      }
    });

    it('should get entity if it exists', async () => {
      const id = 'test';
      jest.spyOn(mockAccountRoleRepository, 'getById').mockResolvedValue({ id });
      const result = await service.handle({ id });
      expect(result).toStrictEqual({ id });
      expect(mockAccountRoleRepository.getById).toBeCalledWith(id);
    });
  });
});
