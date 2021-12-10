import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Quiz } from './quiz.entity';
import { UserAnswer } from './user-answer.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
    unique: true,
    comment: 'user email',
  })
  email: string;

  @Exclude()
  @Column({
    type: 'varchar',
    length: 64,
    nullable: false,
    comment: 'user password sha256 hash',
    name: 'password_hash',
  })
  passwordHash: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
    comment: 'user nickname',
  })
  nickname: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Exclude()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Exclude()
  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;

  @OneToMany(() => Quiz, (quiz) => quiz.owner)
  quizes: Quiz[];

  @OneToMany(() => UserAnswer, (userAnswer) => userAnswer.user)
  answers: UserAnswer;
}
