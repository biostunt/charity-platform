import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard, IAuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') implements IAuthGuard {
  private readonly reflector = new Reflector();

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    return super.canActivate(context);
  }
}
