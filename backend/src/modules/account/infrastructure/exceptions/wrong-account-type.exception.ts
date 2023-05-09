import { HttpException, HttpStatus } from '@nestjs/common';

export class WrongAccountTypeException extends HttpException {
  constructor(type: string) {
    super('Неизвестный тип аккаунта', HttpStatus.EXPECTATION_FAILED, { description: `type=${type}` });
  }
}
