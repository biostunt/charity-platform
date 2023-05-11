import { forwardRef, Module } from '@nestjs/common';
import { getDataSourceToken, TypeOrmModule } from '@nestjs/typeorm';
import { AccountEntity } from './domain/account.entity';
import { UserAccountEntity } from './domain/user-account/user-account.entity';
import { CompanyAccountEntity } from './domain/company-account/company-account.entity';
import { AccountRepository } from './infrastructure/database/account.repository';
import { GetAccountByIdService } from './features/get-account-by-id/get-account-by-id.service';
import { CompanyAccountRepository } from './infrastructure/database/company-account.repository';
import { UserAccountRepository } from './infrastructure/database/user-account.repository';
import { RegisterAccountService } from '@modules/account/features/register-account/register-account.service';
import { LoginAccountService } from '@modules/account/features/login-account/login-account.service';
import { AppAuthModule } from '@core/app-auth/app-auth.module';
import { AccountRoleModule } from '@modules/account-role/account-role.module';
import { LoginAccountController } from '@modules/account/features/login-account/login-account.controller';

@Module({
  imports: [
    forwardRef(() => AppAuthModule),
    TypeOrmModule.forFeature([AccountEntity, UserAccountEntity, CompanyAccountEntity]),
    AccountRoleModule,
  ],
  controllers: [LoginAccountController],
  providers: [
    AccountRepository,
    UserAccountRepository,
    CompanyAccountRepository,
    GetAccountByIdService,
    LoginAccountService,
    RegisterAccountService,
  ],
  exports: [GetAccountByIdService],
})
export class AccountModule {}
