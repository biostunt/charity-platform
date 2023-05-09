import { Inject, Injectable } from '@nestjs/common';
import { Account } from '@modules/account/domain/account.domain';
import { AccountRepository } from '../../infrastructure/database/account.repository';
import { InvalidCredentialsException } from '../../infrastructure/exceptions/invalid-credentials.exception';
import { ComparePasswordsService } from '@core/app-auth/features/compare-passwords/compare-passwords.service';
import { GenerateTokenService } from '@core/app-auth/features/generate-token/generate-token.service';

export interface LoginAccount {
  email: Account['email'];
  password: Account['password'];
}

@Injectable()
export class LoginAccountService {
  @Inject(AccountRepository) private readonly accountRepository: AccountRepository;
  @Inject(ComparePasswordsService) private readonly comparePasswordsService: ComparePasswordsService;
  @Inject(GenerateTokenService) private readonly generateTokenService: GenerateTokenService;

  public async handle({ email, password }: LoginAccount): Promise<string> {
    const user = await this.accountRepository.getByEmail(email);
    if (!user) throw new InvalidCredentialsException();
    const isPasswordsEqual = await this.comparePasswordsService.handle(password, user.password);
    if (!isPasswordsEqual) throw new InvalidCredentialsException();
    return await this.generateTokenService.handle({ id: user.id });
  }
}
