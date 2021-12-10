import { Controller, Post } from '@nestjs/common';

@Controller()
export class UserController {
  @Post('login')
  public login() {
    return {
      msg: 'hello',
    };
  }
}
