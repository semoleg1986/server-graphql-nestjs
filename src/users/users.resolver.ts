import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { CurrentUser } from 'src/auth/get-current-user.decorator';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly userService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => User)
  async addToFavorites(
    @Args('id') id: string,
    @CurrentUser() user: User,
  ): Promise<User> {
    return this.userService.addToFavorites(user, id);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => User)
  async removeFromFavorites(
    @Args('id') id: string,
    @CurrentUser() user: User,
  ): Promise<User> {
    return this.userService.removeFromFavorites(user, id);
  }
}
