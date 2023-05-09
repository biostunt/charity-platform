import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { CompanyAccountEntity } from '../../domain/company-account/company-account.entity';

@Injectable()
export class CompanyAccountRepository extends Repository<CompanyAccountEntity> {
  async isInnExists(inn: string) {
    return Boolean(await this.count({ where: { inn } }));
  }
}
