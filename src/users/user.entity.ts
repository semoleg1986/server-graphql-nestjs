import { Property } from 'src/property/property.entity';
import { ObjectType, Field } from '@nestjs/graphql';
import {
  Entity,
  Column,
  ObjectIdColumn,
  UpdateDateColumn,
  OneToMany,
  PrimaryColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
@ObjectType('User')
export class User {
  @ObjectIdColumn()
  _id: string;

  @PrimaryColumn('uuid')
  id: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  name?: string;

  @Field()
  @Column({ unique: true })
  email: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  emailVerified?: Date;

  @Field({ nullable: true })
  @Column({ nullable: true })
  image?: string;

  @Column()
  password: string;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;

  @Field(() => [String])
  @Column('simple-array', { default: [] })
  favoriteIds: string[];

  @Field(() => [Property])
  @OneToMany(() => Property, (property) => property.user)
  properties: Property[];
}
