import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  public readonly NODE_ENV: string;
  public readonly JWT_SECRET: string;
  public readonly JWT_EXPIRES_IN: string;
  constructor(private readonly configService: ConfigService) {
    this.NODE_ENV = this.configService.get<string>('NODE_ENV') || 'development';
    this.JWT_SECRET = this.configService.get<string>('JWT_SECRET') || 'sup3rS3cR3TP4S5w0Rd';
    this.JWT_EXPIRES_IN = this.configService.get<string>('JWT_EXPIRES_IN') || '2h';
  }
}
