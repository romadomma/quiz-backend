import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Question } from './question.entity';
import { Answer } from './answer.entity';
import { User } from './user.entity';

@Entity()
export class UserAnswer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'user_id',
    nullable: false,
  })
  userId: number;

  @Column({
    name: 'answer_id',
    nullable: false,
  })
  answerId: number;

  @Column({
    name: 'quiz_id',
    nullable: false,
  })
  quizId: number;

  @Column({
    nullable: false,
  })
  order: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;

  @ManyToOne(() => Answer, (answer) => answer.userAnswers)
  @JoinColumn({ name: 'answer_id' })
  answer: Answer;

  @ManyToOne(() => User, (user) => user.answers)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
