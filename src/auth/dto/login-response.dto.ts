import { User } from '../../entities/user.entity';
import { IsString } from 'class-validator';

export class LoginResponseDto extends User {
  constructor(partial: Partial<User & { accessToken }>) {
    super(partial);
    Object.assign(this, partial);
  }

  @IsString()
  accessToken: string;
}
