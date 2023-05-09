import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountRoleEntity } from './domain/account-role.entity';
import { AccountRoleRepository } from './infrastructure/database/account-role.repository';
import { GetAccountRoleByIdService } from './features/get-account-role-by-id/get-account-role-by-id.service';

@Module({
  imports: [TypeOrmModule.forFeature([AccountRoleEntity])],
  providers: [AccountRoleRepository, GetAccountRoleByIdService],
  exports: [GetAccountRoleByIdService],
})
export class AccountRoleModule {}
