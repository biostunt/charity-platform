import { Inject, Injectable } from '@nestjs/common';
import { AccountRepository } from '../../infrastructure/database/account.repository';
import { CompanyAccount } from '../../domain/company-account/company-account.domain';
import { UserAccount } from '../../domain/user-account/user-account.domain';
import { AccountTypeEnum } from '../../domain/account-type.enum';
import { WrongAccountTypeException } from '../../infrastructure/exceptions/wrong-account-type.exception';
import { AccountRole } from '@modules/account-role/domain/account-role.domain';
import { AccountWithEmailExistException } from '../../infrastructure/exceptions/account-with-email-exist.exception';
import { UserAccountRepository } from '../../infrastructure/database/user-account.repository';
import { CompanyAccountRepository } from '../../infrastructure/database/company-account.repository';
import { AccountWithInnExistException } from '../../infrastructure/exceptions/account-with-inn-exist.exception';
import { EncryptPasswordService } from '@core/app-auth/features/encrypt-password/encrypt-password.service';
// eslint-disable-next-line max-len
import { GetAccountRoleByIdService } from '@modules/account-role/features/get-account-role-by-id/get-account-role-by-id.service';

type RegisterUserAccount = Omit<UserAccount, 'id' | 'role' | 'isVerified' | 'isBlocked'> & {
  roleId: AccountRole['id'];
};
type RegisterCompanyAccount = Omit<CompanyAccount, 'id' | 'role' | 'isVerified' | 'isBlocked'> & {
  roleId: AccountRole['id'];
};
export type RegisterAccount = RegisterUserAccount | RegisterCompanyAccount;

@Injectable()
export class RegisterAccountService {
  @Inject(GetAccountRoleByIdService) private readonly getAccountRoleByIdService: GetAccountRoleByIdService;
  @Inject(CompanyAccountRepository) private readonly companyAccountRepository: CompanyAccountRepository;
  @Inject(EncryptPasswordService) private readonly encryptPasswordService: EncryptPasswordService;
  @Inject(UserAccountRepository) private readonly userAccountRepository: UserAccountRepository;
  @Inject(AccountRepository) private readonly accountRepository: AccountRepository;

  async register(props: RegisterAccount) {
    const type = props.type;
    switch (props.type) {
      case AccountTypeEnum.USER:
        return await this.registerUserAccount(props);
      case AccountTypeEnum.COMPANY:
        return await this.registerCompanyAccount(props);
      default:
        throw new WrongAccountTypeException(type);
    }
  }

  private async registerUserAccount(props: RegisterUserAccount): Promise<UserAccount> {
    const { roleId, ...entityData } = props;
    if (await this.accountRepository.isEmailExists(props.email)) throw new AccountWithEmailExistException();
    const role = await this.getAccountRoleByIdService.handle({ id: roleId });
    const entity = await this.userAccountRepository.create({
      ...entityData,
      password: await this.encryptPasswordService.handle(entityData.password),
      role,
    });
    return await this.userAccountRepository.save(entity);
  }

  private async registerCompanyAccount(props: RegisterCompanyAccount): Promise<CompanyAccount> {
    const { roleId, ...entityData } = props;
    if (await this.accountRepository.isEmailExists(props.email)) throw new AccountWithEmailExistException();
    if (await this.companyAccountRepository.isInnExists(props.inn)) throw new AccountWithInnExistException();
    const role = await this.getAccountRoleByIdService.handle({ id: roleId });
    const entity = await this.companyAccountRepository.create({
      ...entityData,
      password: await this.encryptPasswordService.handle(entityData.password),
      role,
    });
    return await this.companyAccountRepository.save(entity);
  }
}
