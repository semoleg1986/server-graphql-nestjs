import { Field, ObjectType, Float, Int } from '@nestjs/graphql';
import { PropertySetting } from './PropertySetting';

@ObjectType()
export class Property {
  @Field(() => Int)
  id: number;

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

  @Field({ nullable: true })
  settings?: PropertySetting;
}
