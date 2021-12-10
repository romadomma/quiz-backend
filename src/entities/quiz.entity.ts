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

  @ManyToOne(() => User, (user) => user.quizes)
  @JoinColumn({ name: 'owner_id' })
  owner: User;

  @OneToMany(() => Question, (question) => question.quiz)
  questions: Question[];
}
