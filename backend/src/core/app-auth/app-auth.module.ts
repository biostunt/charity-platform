import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AccountModule } from '@modules/account/account.module';
import { AppConfigModule } from '@core/app-config/app-config.module';
import { AppConfigService } from '@core/app-config/app-config.service';
import { GetAccountByIdService } from '@modules/account/features/get-account-by-id/get-account-by-id.service';
import { GET_AUTH_OBJECT_BY_ID_SERVICE } from './infrastructure/interfaces/get-auth-object-by-id.service.interface';
import { ComparePasswordsService } from './features/compare-passwords/compare-passwords.service';
import { EncryptPasswordService } from './features/encrypt-password/encrypt-password.service';
import { GenerateTokenService } from './features/generate-token/generate-token.service';
import { PassportModule } from '@nestjs/passport';
import { JwtAuthStrategy } from '@core/app-auth/infrastructure/strategies/jwt-auth.strategy';

@Module({
  imports: [
    AppConfigModule,
    AccountModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [AppConfigModule],
      inject: [AppConfigService],
      useFactory: (appConfigService: AppConfigService) => ({
        global: true,
        secret: appConfigService.JWT_SECRET,
        signOptions: {
          expiresIn: appConfigService.JWT_EXPIRES_IN,
          algorithm: 'HS256',
        },
      }),
    }),
  ],
  providers: [
    JwtAuthStrategy,
    ComparePasswordsService,
    EncryptPasswordService,
    GenerateTokenService,
  ],
  exports: [ComparePasswordsService, EncryptPasswordService, GenerateTokenService],
})
export class AppAuthModule {}
