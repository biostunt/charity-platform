import { BaseEntity } from '@common/base/entity.base';
import { Account } from './account.domain';
import { Column, Entity, JoinColumn, ManyToOne, TableInheritance } from 'typeorm';
import { AccountTypeEnum } from './account-type.enum';
import { AccountRoleEntity } from '@modules/account-role/domain/account-role.entity';

@Entity('account')
@TableInheritance({
  column: { name: 'type', type: 'enum', enum: AccountTypeEnum },
})
export class AccountEntity extends BaseEntity implements Account {
  public type!: AccountTypeEnum;

  @ManyToOne(() => AccountRoleEntity, { nullable: false })
  @JoinColumn({ name: 'role_id' })
  role: AccountRoleEntity;

  @Column({ name: 'email', unique: true })
  public readonly email: string;

  @Column({ name: 'password' })
  public password: string;

  @Column({ name: 'display_name' })
  public displayName: string;

  @Column({ name: 'description', nullable: true })
  public description?: string;

  @Column({ name: 'is_verified', default: false })
  public isVerified: boolean;

  @Column({ name: 'verified_at', nullable: true })
  verifiedAt?: Date;

  @ManyToOne(() => AccountEntity, { nullable: true })
  @JoinColumn({ name: 'verified_by' })
  verifiedBy?: AccountEntity;

  @Column({ name: 'is_blocked', default: false })
  public isBlocked: boolean;

  @Column({ name: 'blocked_at', nullable: true })
  public blockedAt?: Date;

  @ManyToOne(() => AccountEntity, { nullable: true })
  @JoinColumn({ name: 'blocked_by' })
  public blockedBy?: AccountEntity;
}
