import { BaseDomain } from 'src/common/base/domain.base';

export interface AccountRole extends BaseDomain {
  name: string;
  permissions: string[];
}
