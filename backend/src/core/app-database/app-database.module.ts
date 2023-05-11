import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppConfigModule } from '@core/app-config/app-config.module';
import { AppConfigService } from '@core/app-config/app-config.service';
import { AccountEntity } from '@modules/account/domain/account.entity';
import { AccountRoleEntity } from '@modules/account-role/domain/account-role.entity';
import { DonationEntity } from '@modules/donation/domain/donation.entity';
import { DonationPartEntity } from '@modules/donation-part/domain/donation-part.entity';
import { GoalEntity } from '@modules/goal/domain/goal.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [AppConfigModule],
      inject: [AppConfigService],
      useFactory: (appConfigService: AppConfigService) => ({
        type: 'postgres',
        migrationsTableName: 'app-migration-history',
        host: appConfigService.DB_HOST,
        port: appConfigService.DB_PORT,
        database: appConfigService.DB_DATABASE,
        username: appConfigService.DB_USERNAME,
        password: appConfigService.DB_PASSWORD,
        synchronize: true,
        entities: [AccountEntity, AccountRoleEntity, DonationEntity, DonationPartEntity, GoalEntity],
      }),
    }),
  ],
})
export class AppDatabaseModule {}
