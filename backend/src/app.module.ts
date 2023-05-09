import { Module } from '@nestjs/common';
import { AppConfigModule } from '@core/app-config/app-config.module';
import { AppAuthModule } from '@core/app-auth/app-auth.module';
@Module({
  imports: [AppConfigModule, AppAuthModule],
})
export class AppModule {}
