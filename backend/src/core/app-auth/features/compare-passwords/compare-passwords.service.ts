import { Injectable } from '@nestjs/common';
import { compare as comparePasswords } from 'bcrypt';

@Injectable()
export class ComparePasswordsService {
  async handle(decoded: string, encoded: string): Promise<boolean> {
    return await comparePasswords(decoded, encoded);
  }
}
