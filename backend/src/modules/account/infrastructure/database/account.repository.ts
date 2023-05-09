import { Repository } from 'typeorm';
import { AccountEntity } from '@modules/account/domain/account.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AccountRepository extends Repository<AccountEntity> {
  async getById(id: AccountEntity['id']) {
    return await this.findOne({ where: { id }, relations: ['role'] });
  }
  async isEmailExists(email: string) {
    return Boolean(await this.count({ where: { email } }));
  }
}
