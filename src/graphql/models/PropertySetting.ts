import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PropertySetting {
  @Field(() => Int)
  propertyId: number;

  @Field({ defaultValue: false })
  recieveNotifications: boolean;

  @Field({ defaultValue: false })
  recieveEmails: boolean;
}
