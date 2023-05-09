import { hash as hashPassword } from 'bcrypt'
import { Injectable } from '@nestjs/common';

@Injectable()
export class EncryptPasswordService {
  async handle(password: string): Promise<string> {
    return await hashPassword(password, 5);
  }
}