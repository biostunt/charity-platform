import { Inject, Injectable } from '@nestjs/common';
import { Account } from '../../domain/account.domain';
import { AccountRepository } from '../../infrastructure/database/account.repository';
import { AccountNotFoundException } from '../../infrastructure/exceptions/account-not-found.exception';

export interface GetAccountById {
  id: Account['id'];
}

@Injectable()
export class GetAccountByIdService {
  @Inject(AccountRepository) private readonly accountRepository: AccountRepository;
  async handle({ id }: GetAccountById): Promise<Account> {
    const account = await this.accountRepository.getById(id);
    if (!account) throw new AccountNotFoundException(id);
    return account;
  }
}
