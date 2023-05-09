import { Repository } from 'typeorm';
import { UserAccountEntity } from '../../domain/user-account/user-account.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserAccountRepository extends Repository<UserAccountEntity> {}
