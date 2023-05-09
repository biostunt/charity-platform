import { HttpException, HttpStatus } from '@nestjs/common';
import { Account } from '../../domain/account.domain';

export class AccountNotFoundException extends HttpException {
  constructor(id: Account['id']) {
    super(`Аккаунт с таким id не найден`, HttpStatus.NOT_FOUND, { description: `id=${id}` });
  }
}
