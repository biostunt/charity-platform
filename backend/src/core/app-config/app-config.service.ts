import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  public readonly NODE_ENV: string;

  public readonly JWT_SECRET: string;
  public readonly JWT_EXPIRES_IN: string;

  public readonly DB_HOST: string;
  public readonly DB_PORT: number;
  public readonly DB_SSL_ENABLED: boolean;
  public readonly DB_DATABASE: string;
  public readonly DB_USERNAME: string;
  public readonly DB_PASSWORD: string;

  constructor(private readonly configService: ConfigService) {
    this.NODE_ENV = this.configService.get<string>('NODE_ENV', 'development');
    this.JWT_SECRET = this.configService.get<string>('JWT_SECRET', 'sup3rS3cR3TP4S5w0Rd');
    this.JWT_EXPIRES_IN = this.configService.get<string>('JWT_EXPIRES_IN', '2h');
    this.DB_HOST = this.configService.get<string>('DB_HOST', 'localhost');
    this.DB_PORT = this.configService.get<number>('DB_PORT', 5432);
    this.DB_SSL_ENABLED = this.configService.get<boolean>('DB_SSL_ENABLED', false);
    this.DB_DATABASE = this.configService.get<string>('DB_DATABASE', 'db_charity');
    this.DB_USERNAME = this.configService.get<string>('DB_USERNAME', 'postgres');
    this.DB_PASSWORD = this.configService.get<string>('DB_PASSWORD', 'postgres');
  }
}
