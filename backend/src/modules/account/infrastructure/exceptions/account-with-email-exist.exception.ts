import { HttpException, HttpStatus } from '@nestjs/common';

export class AccountWithEmailExistException extends HttpException {
  constructor() {
    super('Аккаунт с таким email уже зарегистрирован', HttpStatus.BAD_REQUEST);
  }
}
