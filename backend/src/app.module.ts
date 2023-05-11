import { Module } from '@nestjs/common';
import { AppConfigModule } from '@core/app-config/app-config.module';
import { AppAuthModule } from '@core/app-auth/app-auth.module';
import { AccountModule } from '@modules/account/account.module';
import { AccountRoleModule } from '@modules/account-role/account-role.module';
import { AppDatabaseModule } from '@core/app-database/app-database.module';
@Module({
  imports: [
    AppConfigModule,
    AppDatabaseModule,
    AppAuthModule,
    AccountModule,
    AccountRoleModule
  ],
})
export class AppModule {}
