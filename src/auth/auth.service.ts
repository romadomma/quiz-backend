import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as crypto from 'crypto';
import { AuthConfig } from './auth.config';
import { ConfigService } from '@nestjs/config';
import { User } from '../entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { PayloadDto } from './dto/payload.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    private authConfig: ConfigService<AuthConfig, true>,
  ) {}

  private getPasswordHash(clientHash: string) {
    return crypto
      .createHash('sha256')
      .update(this.authConfig.get('passwordSalt', { infer: true }) + clientHash)
      .digest('hex');
  }

  async validateUser(email: string, clientPassHash: string) {
    const user = await this.userService.getUserByEmail(email);
    if (user && user.passwordHash === this.getPasswordHash(clientPassHash)) {
      return user;
    }
  }

  async validateTokenPayload({ email }: PayloadDto) {
    const user = await this.userService.getUserByEmail(email);
    if (user) {
      return user;
    }
  }

  async login(user: User) {
    const payload = {
      email: user.email,
      nickname: user.nickname,
      sub: user.id,
    };
    return {
      ...user,
      accessToken: this.jwtService.sign(payload),
    };
  }
}
