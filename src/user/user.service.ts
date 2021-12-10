import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import * as crypto from 'crypto';
import { UserConfig } from './user.config';
import { ConfigService } from '@nestjs/config';

export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly userConfig: ConfigService<UserConfig, true>,
  ) {}

  private getPasswordHash(clientHash: string) {
    return crypto
      .createHash('sha256')
      .update(this.userConfig.get('passwordSalt', { infer: true }) + clientHash)
      .digest('hex');
  }

  public login(email: string, clientPasswordHash: string) {
    const passwordHash = this.getPasswordHash(clientPasswordHash);
    return this.usersRepository.findOne({
      where: {
        email,
        passwordHash,
      },
    });
  }
}
