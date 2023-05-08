import { BaseEntity } from 'src/common/base/entity.base';
import { Donation } from '@modules/donation/domain/donation.domain';
import { AccountEntity } from '@modules/account/domain/account.entity';
import { DonationStatusEnum } from '@modules/donation/domain/donation-status.enum';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { GoalEntity } from '@modules/goal/domain/goal.entity';

@Entity('donation')
export class DonationEntity extends BaseEntity implements Donation {
  @Column({ name: 'status', type: 'enum', enum: DonationStatusEnum, default: DonationStatusEnum.CREATED })
  public status: DonationStatusEnum;

  @ManyToOne(() => AccountEntity, { nullable: false })
  @JoinColumn({ name: 'owner_id' })
  public owner: AccountEntity;

  @Column({ name: 'value', type: 'float' })
  public value: number;

  @ManyToOne(() => GoalEntity, { nullable: false })
  @JoinColumn({ name: 'goal_id' })
  public goal: GoalEntity;
}
