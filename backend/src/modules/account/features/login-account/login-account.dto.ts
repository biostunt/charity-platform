import { LoginAccount } from './login-account.service';
import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginAccountDto implements LoginAccount {
  @IsEmail()
  @ApiProperty({ type: 'string', example: 'test@test.com', required: true })
  public email: string;

  @IsString()
  @MinLength(5)
  @ApiProperty({ type: 'string', example: 'password', required: true, minLength: 5 })
  public password: string;
}
