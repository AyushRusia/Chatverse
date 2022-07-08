import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Friend {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  _id: string;

  @Column()
  user1: string;

  @Column()
  user2: string;
}
