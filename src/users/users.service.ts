// user.service.ts
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { SignupResponse } from 'src/auth/dto/signup-response';
import { CreateUserInput } from './inputs/create-user.input';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async createUser(createUserInput: CreateUserInput): Promise<SignupResponse> {
    const { email } = createUserInput;
    const existingUser = await this.usersRepository.findOne({
      where: { email },
    });
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const user = this.usersRepository.create({
      ...createUserInput,
      id: uuid(),
    });
    try {
      return await this.usersRepository.save(user);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async getUserById(id: string): Promise<User> {
    return await this.usersRepository.findOne({ where: { id } });
  }

  async getUser(email: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException(`User ${email} not found.`);
    }
    return user;
  }
}
