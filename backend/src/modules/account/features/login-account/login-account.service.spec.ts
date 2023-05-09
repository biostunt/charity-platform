import { getRepositoryToken } from '@nestjs/typeorm';
import { AccountRepository } from '@modules/account/infrastructure/database/account.repository';
import { ComparePasswordsService } from '@core/app-auth/features/compare-passwords/compare-passwords.service';
import { GenerateTokenService } from '@core/app-auth/features/generate-token/generate-token.service';
import { LoginAccountService } from '@modules/account/features/login-account/login-account.service';
import { Test } from '@nestjs/testing';
import { InvalidCredentialsException } from '@modules/account/infrastructure/exceptions/invalid-credentials.exception';

const mockAccountRepository = {
  getByEmail: jest.fn(),
};

const mockComparePasswordsService = {
  handle: jest.fn(),
};

const mockGenerateTokenService = {
  handle: jest.fn(),
};

describe('LoginAccountService', () => {
  let service: LoginAccountService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        { provide: getRepositoryToken(AccountRepository), useValue: mockAccountRepository },
        { provide: ComparePasswordsService, useValue: mockComparePasswordsService },
        { provide: GenerateTokenService, useValue: mockGenerateTokenService },
        LoginAccountService,
      ],
    }).compile();
    service = moduleRef.get(LoginAccountService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('#handle()', () => {
    const payload = { email: 'email', password: 'password' };

    it('should throw error if account with email doesn`t exists', async () => {
      jest.spyOn(mockAccountRepository, 'getByEmail').mockResolvedValue(null);
      try {
        await service.handle(payload);
        expect(true).toBe(false);
      } catch (error) {
        expect(error).toBeInstanceOf(InvalidCredentialsException);
        expect(mockAccountRepository.getByEmail).toBeCalledWith(payload.email);
        expect(mockComparePasswordsService.handle).not.toBeCalled();
      }
    });

    it('should throw error if password wrong', async () => {
      jest.spyOn(mockAccountRepository, 'getByEmail').mockResolvedValue(payload);
      jest.spyOn(mockComparePasswordsService, 'handle').mockResolvedValue(false);
      try {
        await service.handle(payload);
        expect(true).toBe(false);
      } catch (error) {
        expect(error).toBeInstanceOf(InvalidCredentialsException);
        expect(mockAccountRepository.getByEmail).toBeCalledWith(payload.email);
        expect(mockComparePasswordsService.handle).toBeCalledWith(payload.password, payload.password);
      }
    });
    it('should return token if email and password are right', async () => {
      const mockAccount = { id: 1, ...payload };
      const token = 'test-token';
      jest.spyOn(mockAccountRepository, 'getByEmail').mockResolvedValue(mockAccount);
      jest.spyOn(mockComparePasswordsService, 'handle').mockResolvedValue(true);
      jest.spyOn(mockGenerateTokenService, 'handle').mockResolvedValue(token);
      const result = await service.handle(payload);
      expect(mockAccountRepository.getByEmail).toBeCalledWith(payload.email);
      expect(mockComparePasswordsService.handle).toBeCalledWith(payload.password, mockAccount.password);
      expect(mockGenerateTokenService.handle).toBeCalledWith({ id: mockAccount.id });
      expect(result).toBe(token);
    });
  });
});
