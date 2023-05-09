import { Repository } from 'typeorm';
import { AccountRoleEntity } from '../../domain/account-role.entity';

export class AccountRoleRepository extends Repository<AccountRoleEntity> {
  async getById(id: AccountRoleEntity['id']) {
    return await this.findOne({
      where: { id },
    });
  }
}
