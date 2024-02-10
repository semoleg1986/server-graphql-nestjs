import { Field, ID, InputType } from '@nestjs/graphql';
import {
  IsInt,
  Min,
  IsString,
  IsOptional,
  IsNumber,
  IsUUID,
  IsEnum,
} from 'class-validator';
import { PropertyStatus } from '../property.status';

@InputType()
export class UpdatePropertyInput {
  @Field(() => ID)
  @IsUUID('4', { each: true })
  id: string;

  @Field({ nullable: true })
  @IsOptional() // Поле необязательное
  @IsString({ message: 'Title should be a string' }) // Поле должно быть строкой
  title?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString({ message: 'Description should be a string' })
  description?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString({ message: 'Image source should be a string' })
  imageSrc?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString({ message: 'Category should be a string' })
  category?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsInt({ message: 'Room count should be an integer' }) // Поле должно быть целым числом
  @Min(0, { message: 'Room count should be at least 0' }) // Поле должно быть больше или равно 0
  roomCount?: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsInt({ message: 'Bathroom count should be an integer' })
  @Min(0, { message: 'Bathroom count should be at least 0' })
  bathroomCount?: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsInt({ message: 'Guest count should be an integer' })
  @Min(0, { message: 'Guest count should be at least 0' })
  guestCount?: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString({ message: 'Location value should be a string' })
  locationValue?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsNumber({}, { message: 'Price should be a number' }) // Поле должно быть числом
  @Min(1, { message: 'Price should be at least 0' })
  price?: number;

  @Field()
  @IsEnum(PropertyStatus)
  status?: PropertyStatus;
}
