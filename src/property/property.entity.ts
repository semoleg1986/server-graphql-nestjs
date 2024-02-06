import {
  Column,
  Entity,
  ObjectIdColumn,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Property {
  @ObjectIdColumn()
  _id: string;

  @PrimaryColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  imageSrc: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  category: string;

  @Column()
  roomCount: number;

  @Column()
  bathroomCount: number;

  @Column()
  guestCount: number;

  @Column()
  locationValue: string;

  @Column()
  userId: string;

  @Column()
  price: number;
}
