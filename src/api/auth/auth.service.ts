import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  public constructor(
    private readonly userRepository: UserService,
    private jwtService: JwtService,
  ) {}

  async validate(email: string, password: string): Promise<any> {
    const user = await this.userRepository.validateUser(email, password);
    if (user === null) {
      throw new UnauthorizedException();
    }
    return user;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(dataUser: CreateUserDto) {
    return this.userRepository.create(dataUser);
  }
}
