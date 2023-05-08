import { BaseDomain } from 'src/common/base/domain.base';
import { Account } from '@modules/account/domain/account.domain';
import { DonationStatusEnum } from './donation-status.enum';
import { Goal } from '@modules/goal/domain/goal.domain';

export interface Donation extends BaseDomain {
  status: DonationStatusEnum;
  owner: Account;
  value: number;
  goal: Goal;
}
