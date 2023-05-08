import { AccountEntity } from '../account.entity';
import { CompanyAccount } from './company-account.domain';
import { AccountTypeEnum } from '../account-type.enum';
import { Column } from 'typeorm';
const { COMPANY } = AccountTypeEnum;

export class CompanyAccountEntity extends AccountEntity implements CompanyAccount {
  public type: typeof COMPANY = COMPANY;
  @Column({ name: 'company_name' })
  public companyName: string;

  @Column({ name: 'inn' })
  public inn: string;

  @Column({ name: 'address' })
  public address: string;
}
