import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../database/entities/user';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  all(): Promise<User[]> {
    return this.userRepository.find();
  }

  find(_id: number): Promise<User> {
    return this.userRepository.findOne({ where: { id: _id } });
  }

  async create(dataUser: CreateUserDto) {
    const salt = await bcrypt.genSalt();
    const user = new User();
    user.email = dataUser.email;
    user.password = await bcrypt.hash(dataUser.password, salt);
    user.name = dataUser.name;
    await this.userRepository.save(user);
    return true;
  }

  async validateUser(_email: string, _password: string) {
    const user = await this.userRepository.findOne({
      where: { email: _email },
    });
    if (user && (await bcrypt.compare(_password, user.password))) {
      return user;
    }
    return null;
  }
}
