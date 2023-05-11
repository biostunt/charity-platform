import {
  GET_AUTH_OBJECT_BY_ID_SERVICE,
  IGetAuthObjectByIdService,
} from '../../infrastructure/interfaces/get-auth-object-by-id.service.interface';
import { JwtTokenPayload } from '@core/app-auth/infrastructure/interfaces/jwt-token-payload.interface';
import { AppConfigService } from '@core/app-config/app-config.service';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable } from '@nestjs/common';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { GetAccountByIdService } from '@modules/account/features/get-account-by-id/get-account-by-id.service';

@Injectable()
export class JwtAuthStrategy extends PassportStrategy(Strategy) {
  @Inject(GetAccountByIdService)
  private readonly getAccountByIdService: GetAccountByIdService;

  constructor(private readonly appConfigService: AppConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: appConfigService.JWT_SECRET,
      ignoreExpiration: false,
    });
  }

  async validate({ id }: JwtTokenPayload) {
    return await this.getAccountByIdService.handle({ id });
  }
}
