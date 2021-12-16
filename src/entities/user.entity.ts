import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Quiz } from './quiz.entity';
import { UserAnswer } from './user-answer.entity';
import { Exclude } from 'class-transformer';
import { Room } from './room.entity';
import { JoinTable } from 'typeorm/browser';
import { RoomUser } from './room-user.entity';

@Entity()
export class User {
  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }

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

  @OneToMany(() => UserAnswer, (userAnswer) => userAnswer.user)
  answers: UserAnswer;

  @OneToMany(() => Quiz, (quiz) => quiz.owner)
  quizzes: Quiz[];

  @OneToMany(() => Room, (room) => room.quiz)
  rooms: Room[];
}
