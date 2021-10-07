import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  public constructor(private readonly userRepository: UserService) {}

  async validate(email: string, password: string) {
    const user = await this.userRepository.validateUser(email, password);
    if (user === null) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
