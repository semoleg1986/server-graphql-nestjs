import { UseGuards } from '@nestjs/common';
import { Query, Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { SigninResponse } from './dto/signin-response';
import { SignupUserInput } from './dto/signup-user.input';
import { SignupResponse } from './dto/signup-response';
import { GqlAuthGuard } from './guard/gql-auth.guard';
import { User } from 'src/users/user.entity';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { CurrentUser } from './get-current-user.decorator';
@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Query(() => User, { nullable: true })
  @UseGuards(JwtAuthGuard)
  async me(@CurrentUser() user: User): Promise<User> {
    return user;
  }

  @Mutation(() => SignupResponse)
  async signup(
    @Args('loginUserInput') loginUserInput: SignupUserInput,
  ): Promise<SignupResponse> {
    return this.authService.signup(loginUserInput);
  }

  @Mutation(() => SigninResponse)
  @UseGuards(GqlAuthGuard)
  async signin(
    @Args('loginUserInput') loginUserInput: SignupUserInput,
    @Context() context,
  ): Promise<SigninResponse> {
    return this.authService.signin(context.user);
  }
}
