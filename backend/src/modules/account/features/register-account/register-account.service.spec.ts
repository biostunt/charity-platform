// eslint-disable-next-line max-len
import { GetAccountRoleByIdService } from '@modules/account-role/features/get-account-role-by-id/get-account-role-by-id.service';
import { EncryptPasswordService } from '@core/app-auth/features/encrypt-password/encrypt-password.service';
import { WrongAccountTypeException } from '../../infrastructure/exceptions/wrong-account-type.exception';
import { RegisterAccount, RegisterAccountService } from './register-account.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Test } from '@nestjs/testing';
import { CompanyAccountRepository } from '../../infrastructure/database/company-account.repository';
import { AccountRepository } from '../../infrastructure/database/account.repository';
import { UserAccountRepository } from '../../infrastructure/database/user-account.repository';
import { AccountTypeEnum } from '../../domain/account-type.enum';
import { AccountWithEmailExistException } from '../../infrastructure/exceptions/account-with-email-exist.exception';
import { AccountWithInnExistException } from '../../infrastructure/exceptions/account-with-inn-exist.exception';

const mockAccountRepository = {
  isEmailExists: jest.fn(),
};
const mockUserAccountRepository = {
  create: jest.fn(),
  save: jest.fn(),
};
const mockCompanyAccountRepository = {
  isInnExists: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
};
const mockEncryptPasswordService = {
  handle: jest.fn(),
};
const mockGetAccountRoleByIdService = {
  handle: jest.fn(),
};

describe('RegisterAccountService', () => {
  let service: RegisterAccountService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        { provide: getRepositoryToken(CompanyAccountRepository), useValue: mockCompanyAccountRepository },
        { provide: getRepositoryToken(UserAccountRepository), useValue: mockUserAccountRepository },
        { provide: getRepositoryToken(AccountRepository), useValue: mockAccountRepository },
        { provide: GetAccountRoleByIdService, useValue: mockGetAccountRoleByIdService },
        { provide: EncryptPasswordService, useValue: mockEncryptPasswordService },
        RegisterAccountService,
      ],
    }).compile();
    service = moduleRef.get(RegisterAccountService);
  });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('#handle()', () => {
    describe('Wrong Account Type', () => {
      it('should throw WrongAccountTypeException', async () => {
        try {
          await service.register({ type: 'UNKNOWN-TEST-TYPE' } as any);
          expect(true).toBe(false);
        } catch (error) {
          expect(error).toBeInstanceOf(WrongAccountTypeException);
        }
      });
    });

    describe('USER', () => {
      it('should throw error if account email exists', async () => {
        jest.spyOn(mockAccountRepository, 'isEmailExists').mockResolvedValue(true);
        const props = { type: AccountTypeEnum.USER, roleId: 'test' };
        try {
          await service.register(props as RegisterAccount);
          expect(true).toBe(false);
        } catch (error) {
          expect(error).toBeInstanceOf(AccountWithEmailExistException);
        }
      });
      it('shouild create user account', async () => {
        jest.spyOn(mockAccountRepository, 'isEmailExists').mockResolvedValue(false);
        jest.spyOn(mockUserAccountRepository, 'create').mockImplementation((props) => props);
        jest.spyOn(mockUserAccountRepository, 'save').mockImplementation((props) => props);
        jest.spyOn(mockEncryptPasswordService, 'handle').mockImplementation((props) => props);
        jest.spyOn(mockGetAccountRoleByIdService, 'handle').mockImplementation((props) => props);
        const props = { type: AccountTypeEnum.USER, roleId: 'test', password: 'test' };
        const result = await service.register(props as RegisterAccount);
        const expected = {
          type: props.type,
          role: { id: props.roleId },
          password: props.password,
        };
        expect(result).toStrictEqual(expected);
        expect(mockUserAccountRepository.save).toBeCalledWith(expected);
        expect(mockEncryptPasswordService.handle).toBeCalledWith(props.password);
        expect(mockGetAccountRoleByIdService.handle).toBeCalledWith({ id: props.roleId });
      });
    });
    describe('COMPANY', () => {
      it('should throw error if account email exists', async () => {
        jest.spyOn(mockAccountRepository, 'isEmailExists').mockResolvedValue(true);
        const props = { type: AccountTypeEnum.COMPANY, roleId: 'test' };
        try {
          await service.register(props as RegisterAccount);
          expect(true).toBe(false);
        } catch (error) {
          expect(error).toBeInstanceOf(AccountWithEmailExistException);
        }
      });

      it('should throw error if inn exists', async () => {
        jest.spyOn(mockAccountRepository, 'isEmailExists').mockResolvedValue(false);
        jest.spyOn(mockCompanyAccountRepository, 'isInnExists').mockResolvedValue(true);
        const props = { type: AccountTypeEnum.COMPANY, roleId: 'test' };
        try {
          await service.register(props as RegisterAccount);
          expect(true).toBe(false);
        } catch (error) {
          expect(error).toBeInstanceOf(AccountWithInnExistException);
        }
      });

      it('should create company account', async () => {
        jest.spyOn(mockAccountRepository, 'isEmailExists').mockResolvedValue(false);
        jest.spyOn(mockCompanyAccountRepository, 'isInnExists').mockResolvedValue(false);
        jest.spyOn(mockCompanyAccountRepository, 'create').mockImplementation((props) => props);
        jest.spyOn(mockCompanyAccountRepository, 'save').mockImplementation((props) => props);
        jest.spyOn(mockEncryptPasswordService, 'handle').mockImplementation((props) => props);
        jest.spyOn(mockGetAccountRoleByIdService, 'handle').mockImplementation((props) => props);
        const props = { type: AccountTypeEnum.COMPANY, roleId: 'test', password: 'test' };
        const result = await service.register(props as RegisterAccount);
        const expected = {
          type: props.type,
          role: { id: props.roleId },
          password: props.password,
        };
        expect(result).toStrictEqual(expected);
        expect(mockCompanyAccountRepository.save).toBeCalledWith(expected);
        expect(mockEncryptPasswordService.handle).toBeCalledWith(props.password);
        expect(mockGetAccountRoleByIdService.handle).toBeCalledWith({ id: props.roleId });
      });
    });
  });
});
