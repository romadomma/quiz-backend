import {
  ClassSerializerInterceptor,
  Controller,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { LocalAuthGuard } from './local.guard';
import { AuthService } from './auth.service';
import { LoginResponseDto } from './dto/login-response.dto';
import { JwtAuthGuard } from './jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return new LoginResponseDto(await this.authService.login(req.user));
  }

  @UseGuards(JwtAuthGuard)
  @Post('test')
  async testJwtRoute() {
    return;
  }
}
