import { HttpException, HttpStatus } from '@nestjs/common';
import { AccountRole } from '../../domain/account-role.domain';

export class AccountRoleNotFoundException extends HttpException {
  constructor(id: AccountRole['id']) {
    super(`Роль с таким id не найден`, HttpStatus.NOT_FOUND, { description: `id=${id}` });
  }
}