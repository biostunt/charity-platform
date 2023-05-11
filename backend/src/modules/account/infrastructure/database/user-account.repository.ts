import { Repository } from 'typeorm';
import { UserAccountEntity } from '../../domain/user-account/user-account.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserAccountRepository extends Repository<UserAccountEntity> {
  constructor(@InjectRepository(UserAccountEntity) repository: Repository<UserAccountEntity>) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
