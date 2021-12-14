import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { AuthConfig } from './auth.config';
import { PayloadDto } from './dto/payload.dto';
import { User } from '../entities/user.entity';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authConfig: ConfigService<AuthConfig, true>,
    private authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: authConfig.get('jwtSecret', { infer: true }),
    });
  }

  validate(payload: PayloadDto): Promise<User> {
    const user = this.authService.validateTokenPayload(payload);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
