import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { LocalAuthGuard } from './local-auth.guard';

@Controller()
export class AuthController {
  constructor(private readonly userRepository: UserService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req) {
    return req.user;
  }
}
