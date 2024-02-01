import { Field, ObjectType, Float } from '@nestjs/graphql';

@ObjectType()
export class Property {
  @Field()
  name: string;

  @Field(() => Float)
  cost: number;

  @Field()
  description: string;

  @Field()
  location: string;

  @Field()
  contacts: string;
}
