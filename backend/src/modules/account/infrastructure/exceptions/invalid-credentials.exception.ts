import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidCredentialsException extends HttpException {
  constructor() {
    super('Аккаунт с почтой не найден или пароль не совпадает', HttpStatus.UNAUTHORIZED);
  }
}
