import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountEntity } from './domain/account.entity';
import { UserAccountEntity } from './domain/user-account/user-account.entity';
import { CompanyAccountEntity } from './domain/company-account/company-account.entity';
import { AccountRepository } from './infrastructure/database/account.repository';
import { GetAccountByIdService } from './features/get-account-by-id/get-account-by-id.service';
import { CompanyAccountRepository } from './infrastructure/database/company-account.repository';
import { UserAccountRepository } from './infrastructure/database/user-account.repository';
import { RegisterAccountService } from '@modules/account/features/register-account/register-account.service';

@Module({
  imports: [TypeOrmModule.forFeature([AccountEntity, UserAccountEntity, CompanyAccountEntity])],
  providers: [
    AccountRepository,
    CompanyAccountRepository,
    UserAccountRepository,
    GetAccountByIdService,
    RegisterAccountService,
  ],
  exports: [GetAccountByIdService],
})
export class AccountModule {}
