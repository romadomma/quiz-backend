import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { bindNodeCallback, Observable, of } from 'rxjs';
import { PayloadDto } from './dto/payload.dto';
import * as jwt from 'jsonwebtoken';
import { catchError, flatMap, map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { User } from '../entities/user.entity';
import { ConfigService } from '@nestjs/config';
import { AuthConfig } from './auth.config';

@Injectable()
export class JwtWsAuthGuard implements CanActivate {
  constructor(
    protected readonly authService: AuthService,
    private authConfig: ConfigService<AuthConfig, true>,
  ) {}

  async canActivate(context: ExecutionContext) {
    const client = context.switchToWs().getClient();
    const [, authToken]: string[] =
      client.handshake.headers.authorization.split(' ');
    const jwtPayload = jwt.verify(
      authToken,
      this.authConfig.get('jwtSecret', { infer: true }),
    ) as jwt.JwtPayload & PayloadDto;
    const user: User = await this.authService.validateTokenPayload(jwtPayload);
    // Bonus if you need to access your user after the guard
    context.switchToWs().getData().user = user;
    return Boolean(user);
  }
}
