import { User } from 'src/users/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  ObjectIdColumn,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PropertyStatus } from './property.status';
import { Field, Float, ID, Int, ObjectType } from '@nestjs/graphql';

@Entity()
@ObjectType('Property')
export class Property {
  @ObjectIdColumn()
  _id: string;

  @PrimaryColumn()
  @Field(() => ID)
  id: string;

  @Column()
  @Field()
  title: string;

  @Column()
  @Field()
  description: string;

  @Column()
  @Field()
  imageSrc: string;

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @UpdateDateColumn()
  @Field()
  updatedAt: Date;

  @Column()
  @Field()
  status: PropertyStatus;

  @Column()
  @Field()
  category: string;

  @Column()
  @Field(() => Int)
  roomCount: number;

  @Column()
  @Field(() => Int)
  bathroomCount: number;

  @Column()
  @Field(() => Int)
  guestCount: number;

  @Column()
  @Field()
  locationValue: string;

  @Column()
  @Field(() => Float)
  price: number;

  @ManyToOne(() => User, (user) => user.properties)
  @Field(() => User)
  user: User;
}
