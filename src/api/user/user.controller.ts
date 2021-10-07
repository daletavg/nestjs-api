import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('profile')
export class UserController {
  constructor(private readonly userRepository: UserService) {}

  @Get(':id')
  profile(@Param('id') id: number) {
    return this.userRepository.find(id);
  }
}
