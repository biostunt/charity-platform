import { BaseDomain } from 'src/common/base/domain.base';
import { Donation } from '@modules/donation/domain/donation.domain';
import { Goal } from '@modules/goal/domain/goal.domain';

export interface DonationPart extends BaseDomain {
  donation: Donation;
  value: number;
  goalTarget?: Goal;
}
