import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType('Property')
export class PropertyType {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  imageSrc: string;

  @Field()
  createdAt: string;

  @Field()
  updatedAt: string;

  @Field()
  category: string;

  @Field()
  roomCount: number;

  @Field()
  bathroomCount: number;

  @Field()
  guestCount: number;

  @Field()
  locationValue: string;

  @Field()
  userId: string;

  @Field()
  price: number;
}
