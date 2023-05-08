import { AccountEntity } from '../account.entity';
import { UserAccount } from './user-account.domain';
import { ChildEntity, Column } from 'typeorm';
import { AccountTypeEnum } from '../account-type.enum';
const { USER } = AccountTypeEnum;

@ChildEntity(USER)
export class UserAccountEntity extends AccountEntity implements UserAccount {
  public type: typeof USER = USER;

  @Column({ name: 'first_name' })
  public firstName: string;

  @Column({ name: 'last_name' })
  public lastName: string;

  @Column({ name: 'middle_name', nullable: true })
  public middleName?: string;

  @Column({ name: 'phone', nullable: true })
  public phone?: string;
}
