import { DataSource, Repository } from 'typeorm';
import { AccountEntity } from '../../domain/account.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AccountRepository extends Repository<AccountEntity> {
  constructor(@InjectRepository(AccountEntity) repository: Repository<AccountEntity>) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  async getById(id: AccountEntity['id']) {
    return await this.findOne({ where: { id }, relations: ['role'] });
  }

  async getByEmail(email: AccountEntity['email']) {
    return await this.findOne({ where: { email } });
  }

  async isEmailExists(email: string) {
    return Boolean(await this.count({ where: { email } }));
  }
}
