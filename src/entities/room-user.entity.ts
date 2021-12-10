import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class RoomUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'room_id',
    nullable: false,
  })
  roomId: number;

  @Column({
    name: 'user_id',
    nullable: false,
  })
  userId: number;

  @Column({
    type: 'boolean',
    default: false,
    nullable: false,
  })
  final: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}
