import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '@common/base/entity.base';
import { DonationPart } from '@modules/donation-part/domain/donation-part.domain';
import { DonationEntity } from '@modules/donation/domain/donation.entity';
import { GoalEntity } from '@modules/goal/domain/goal.entity';

@Entity('donation_part')
export class DonationPartEntity extends BaseEntity implements DonationPart {
  @ManyToOne(() => DonationEntity, { nullable: false })
  @JoinColumn({ name: 'donation_id' })
  public donation: DonationEntity;

  @Column({ name: 'value', type: 'float', nullable: false })
  public value: number;

  @ManyToOne(() => GoalEntity, { nullable: true })
  @JoinColumn({ name: 'goal_id' })
  public goalTarget?: GoalEntity;
}
