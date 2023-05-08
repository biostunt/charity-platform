import { BaseDomain } from 'src/common/base/domain.base';
import { Account } from '@modules/account/domain/account.domain';
import { DonationStatusEnum } from './donation-status.enum';

export interface Donation extends BaseDomain {
  status: DonationStatusEnum;
  owner: Account;
  value: number;
}
