import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { CompanyAccountEntity } from '../../domain/company-account/company-account.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CompanyAccountRepository extends Repository<CompanyAccountEntity> {
  constructor(@InjectRepository(CompanyAccountEntity) repository: Repository<CompanyAccountEntity>) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  async isInnExists(inn: string) {
    return Boolean(await this.count({ where: { inn } }));
  }
}
