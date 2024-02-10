import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsInt, Min } from 'class-validator';

@InputType()
export class CreatePropertyInput {
  @Field()
  @IsNotEmpty({ message: 'Title should not be empty' })
  title: string;

  @Field()
  @IsNotEmpty({ message: 'Description should not be empty' })
  description: string;

  @Field()
  @IsNotEmpty({ message: 'Image source should not be empty' })
  imageSrc: string;

  @Field()
  @IsNotEmpty({ message: 'Category should not be empty' })
  category: string;

  @Field()
  @IsInt({ message: 'Room count should be an integer' })
  @Min(0, { message: 'Room count should be at least 1' })
  roomCount: number;

  @Field()
  @IsInt({ message: 'Bathroom count should be an integer' })
  @Min(0, { message: 'Bathroom count should be at least 1' })
  bathroomCount: number;

  @Field()
  @IsInt({ message: 'Guest count should be an integer' })
  @Min(0, { message: 'Guest count should be at least 1' })
  guestCount: number;

  @Field()
  @IsNotEmpty({ message: 'Location value should not be empty' })
  locationValue: string;

  @Field()
  @IsInt({ message: 'Price should be an integer' })
  @Min(1, { message: 'Price should be at least 1' })
  price: number;
}
