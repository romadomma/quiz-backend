import { IsEmail, IsOptional, IsString } from 'class-validator';

export class LoginDto {
  @IsEmail()
  public email: string;

  @IsString()
  public passwordHash: string;
}
