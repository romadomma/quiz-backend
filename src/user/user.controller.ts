import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UnauthorizedException,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('login')
  public async login(
    @Body(new ValidationPipe()) { email, passwordHash }: LoginDto,
  ) {
    const user = await this.userService.login(email, passwordHash);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
