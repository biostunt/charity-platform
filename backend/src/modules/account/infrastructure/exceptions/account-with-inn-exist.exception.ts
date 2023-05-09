import { HttpException, HttpStatus } from '@nestjs/common';

export class AccountWithInnExistException extends HttpException {
  constructor() {
    super('Аккаунт с таким ИНН уже существует', HttpStatus.BAD_REQUEST);
  }
}
