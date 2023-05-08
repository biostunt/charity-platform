import { BaseDomain } from 'src/common/base/domain.base';
import { Account } from '@modules/account/domain/account.domain';

export interface Goal extends BaseDomain {
  title: string;
  description?: string;
  value: number;
  /** Продолжить сбор если сумма цели достигнута, если true */
  isFixedValue: boolean;
  owner: Account;

  isAchieved: boolean;
  achievedAt?: Date;

  isRecalculated: boolean;
  recalculatedAt?: Date;
}
