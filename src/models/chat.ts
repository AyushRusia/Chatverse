import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Chat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  room: string;

  @Column({ type: 'text' })
  message: string;

  @Column()
  senderId: string;

  @Column({ type: 'date' })
  time: Date;
}
