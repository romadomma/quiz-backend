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
import { UserAnswer } from './user-answer.entity';

@Entity()
export class Answer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'question_id',
    nullable: false,
  })
  questionId: number;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  text: string;

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

  @ManyToOne(() => Question, (question) => question.answers)
  @JoinColumn({ name: 'question_id' })
  question: Question;

  @OneToMany(() => UserAnswer, (userAnswer) => userAnswer.answer)
  userAnswers: UserAnswer[];
}
