import { Repository } from 'typeorm';
import { AccountRoleEntity } from '../../domain/account-role.entity';
import { InjectRepository } from '@nestjs/typeorm';

export class AccountRoleRepository extends Repository<AccountRoleEntity> {
  constructor(@InjectRepository(AccountRoleEntity) repository: Repository<AccountRoleEntity>) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
  async getById(id: AccountRoleEntity['id']) {
    return await this.findOne({
      where: { id },
    });
  }
}
