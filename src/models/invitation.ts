import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum Status {
  PENDING = 'PENDING',
  ACCEPETD = 'ACCEPETED',
  REJECTED = 'REJECTED',
}
@Entity()
export class Invitation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  _id: string;

  @Column()
  sender_id: string;

  @Column()
  reciever_id: string;

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.PENDING,
  })
  status: Status;
}
