import { Body, Controller, HttpStatus, Inject, Post } from '@nestjs/common';
import { LoginAccountService } from './login-account.service';
import { LoginAccountDto } from './login-account.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('account')
@Controller('account')
export class LoginAccountController {
  @Inject(LoginAccountService) private readonly loginAccountService: LoginAccountService;

  @Post('login')
  @ApiOperation({ summary: 'Create Bearer token for account' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Successfully logged in', schema: { type: 'string' } })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Invalid credentials' })
  async handle(@Body() dto: LoginAccountDto) {
    return await this.loginAccountService.handle(dto);
  }
}
