import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppConfigService } from '@core/app-config/app-config.service';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  providers: [AppConfigService],
  exports: [AppConfigService],
})
export class AppConfigModule {}
