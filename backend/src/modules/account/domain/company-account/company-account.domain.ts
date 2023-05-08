import { Account } from '../account.domain';
import { AccountTypeEnum } from '../account-type.enum';

export interface CompanyAccount extends Account {
  type: AccountTypeEnum.COMPANY;
  companyName: string;
  inn: string;
  address: string;
}