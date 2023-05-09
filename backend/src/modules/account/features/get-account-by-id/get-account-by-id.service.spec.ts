import { GetAccountByIdService } from './get-account-by-id.service';
import { Test } from '@nestjs/testing';
import { AccountRepository } from '../../infrastructure/database/account.repository';
import { AccountNotFoundException } from '../../infrastructure/exceptions/account-not-found.exception';

const mockAccountRepository = {
  getById: jest.fn(),
};

describe('GetAccountByIdService', () => {
  let service: GetAccountByIdService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [GetAccountByIdService, { provide: AccountRepository, useValue: mockAccountRepository }],
    }).compile();
    service = moduleRef.get(GetAccountByIdService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('#handle()', () => {
    it('should throw error if account not found by id', async () => {
      const id = 'test';
      jest.spyOn(mockAccountRepository, 'getById').mockResolvedValue(null);
      try {
        await service.handle({ id });
        expect(true).toBe(false);
      } catch (err) {
        expect(err).toBeInstanceOf(AccountNotFoundException);
        expect(mockAccountRepository.getById).toBeCalledWith(id);
      }
    });

    it('should get entity if it exists', async () => {
      const id = 'test';
      jest.spyOn(mockAccountRepository, 'getById').mockResolvedValue({ id });
      const result = await service.handle({ id });
      expect(result).toStrictEqual({ id });
      expect(mockAccountRepository.getById).toBeCalledWith(id);
    });
  });
});
