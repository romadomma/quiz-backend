import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Question } from './question.entity';
import { Room } from './room.entity';

@Entity()
export class Quiz {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'owner_id',
    nullable: false,
  })
  ownerId: number;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  title: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;

  @OneToMany(() => Question, (question) => question.quiz)
  questions: Question[];

  @OneToMany(() => Room, (room) => room.quiz)
  rooms: Room[];

  @ManyToOne(() => User, (user) => user.quizzes)
  @JoinColumn({ name: 'owner_id' })
  owner: User;
}
