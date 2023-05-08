import { Account } from '../account.domain';
import { AccountTypeEnum } from '../account-type.enum';

export interface UserAccount extends Account {
  type: AccountTypeEnum.USER;
  firstName: string;
  lastName: string;
  middleName?: string;
  phone?: string;
}