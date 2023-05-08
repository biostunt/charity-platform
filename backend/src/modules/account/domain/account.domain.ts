import { BaseDomain } from 'src/common/base/domain.base';
import { AccountTypeEnum } from '@modules/account/domain/account-type.enum';
import { AccountRole } from '@modules/account-role/domain/account-role.domain';

export interface Account extends BaseDomain {
  type: AccountTypeEnum;
  role: AccountRole;
  email: string;
  password: string;
  displayName: string;
  description?: string;
  /** Параметры верификации пользователя */
  isVerified: boolean;
  verifiedAt?: Date;
  verifiedBy?: Account;
  /** Параметры блокировки пользователя */
  isBlocked: boolean;
  blockedAt?: Date;
  blockedBy?: Account;
}
