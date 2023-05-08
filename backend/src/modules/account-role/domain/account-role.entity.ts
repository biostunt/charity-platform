import { BaseEntity } from 'src/common/base/entity.base';
import { Column, Entity } from 'typeorm';
import { stringArrayTransformer } from 'src/common/database/orm/transformers/string-array.transformer';
import { AccountRole } from '@modules/account-role/domain/account-role.domain';

@Entity('account_role')
export class AccountRoleEntity extends BaseEntity implements AccountRole {
  @Column({ name: 'name' })
  public name: string;

  @Column({
    name: 'permissions',
    type: 'text',
    transformer: stringArrayTransformer,
  })
  public permissions: string[];
}
