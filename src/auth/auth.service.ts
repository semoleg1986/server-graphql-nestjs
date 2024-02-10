import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { SignupUserInput } from './dto/signup-user.input';
import * as bcrypt from 'bcrypt';
import { SignupResponse } from './dto/signup-response';
import { User } from 'src/users/user.entity';
import { SigninResponse } from './dto/signin-response';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async signup(loginUserInput: SignupUserInput): Promise<SignupResponse> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(loginUserInput.password, salt);
    loginUserInput.password = hashedPassword;

    return this.usersService.createUser(loginUserInput);
  }

  async signin(user: User): Promise<SigninResponse> {
    const email = user.email;
    const access_token = await this.jwtService.sign({
      email,
      sub: user.id,
    });
    if (!access_token) {
      throw new InternalServerErrorException();
    }
    return {
      access_token,
      email,
    };
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.usersService.getUser(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    throw new UnauthorizedException('Invalid credentials');
  }
}
