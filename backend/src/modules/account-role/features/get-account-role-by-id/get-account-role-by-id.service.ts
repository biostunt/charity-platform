import { Inject, Injectable } from '@nestjs/common';
import { AccountRoleRepository } from '../../infrastructure/database/account-role.repository';
import { AccountRole } from '@modules/account-role/domain/account-role.domain';
import { GetEntityById } from '@common/interfaces/get-entity-by-id.interface';
import { AccountRoleNotFoundException } from '../../infrastructure/exceptions/account-role-not-found.exception';

export type GetAccountRoleById = GetEntityById;

@Injectable()
export class GetAccountRoleByIdService {
  @Inject(AccountRoleRepository) private readonly accountRoleRepository: AccountRoleRepository;

  async handle({ id }: GetAccountRoleById): Promise<AccountRole> {
    const accountRole = await this.accountRoleRepository.getById(id);
    if (!accountRole) throw new AccountRoleNotFoundException(id);
    return await this.accountRoleRepository.getById(id);
  }
}
