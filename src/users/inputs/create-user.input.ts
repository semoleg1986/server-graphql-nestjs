import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field({ nullable: true })
  name?: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  image?: string;

  @Field()
  password: string;

  @Field(() => [String], { defaultValue: [] })
  favoriteIds?: string[];
}
