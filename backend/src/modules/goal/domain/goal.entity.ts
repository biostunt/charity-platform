import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from 'src/common/base/entity.base';
import { Goal } from './goal.domain';
import { AccountEntity } from '@modules/account/domain/account.entity';

@Entity('goal')
export class GoalEntity extends BaseEntity implements Goal {
  @Column({ name: 'title' })
  public readonly title: string;

  @Column({ name: 'description' })
  public readonly description: string;

  @Column({ name: 'value', type: 'float' })
  public value: number;

  @Column({ name: 'is_fixed_value', default: false })
  public isFixedValue: boolean;

  @ManyToOne(() => AccountEntity)
  @JoinColumn({ name: 'owner_id' })
  public owner: AccountEntity;

  @Column({ name: 'is_achieved', default: false })
  public isAchieved: boolean;

  @Column({ name: 'achieved_at', nullable: true })
  public achievedAt?: Date;

  @Column({ name: 'is_recalculated', default: false })
  public isRecalculated: boolean;

  @Column({ name: 'recalculated_at', nullable: true })
  public recalculatedAt: Date;
}
