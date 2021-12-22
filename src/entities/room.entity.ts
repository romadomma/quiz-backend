import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinTable,
} from 'typeorm';
import { User } from './user.entity';
import { Quiz } from './quiz.entity';

@Entity()
export class Room {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'admin_id',
    nullable: false,
  })
  adminId: number;

  @Column({
    name: 'quiz_id',
    nullable: false,
  })
  quizId: number;

  @Column({
    type: 'varchar',
    length: 6,
    nullable: false,
  })
  code: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;

  @ManyToOne(() => User, (user) => user.rooms)
  @JoinColumn({ name: 'admin_id' })
  admin: User;

  @ManyToOne(() => Quiz, (quiz) => quiz.rooms)
  @JoinColumn({ name: 'quiz_id' })
  quiz: Quiz;

  @ManyToMany(() => User)
  @JoinTable({
    name: 'room_user',
    joinColumn: {
      name: 'room_id',
      referencedColumnName: 'id',
    },
  })
  users: User[];
}
