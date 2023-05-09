import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtTokenPayload } from '@core/app-auth/infrastructure/interfaces/jwt-token-payload.interface';

@Injectable()
export class GenerateTokenService {
  @Inject(JwtService) private readonly jwtService: JwtService;

  async handle<T = string>(payload: JwtTokenPayload<T>): Promise<string> {
    return this.jwtService.signAsync(payload);
  }
}
