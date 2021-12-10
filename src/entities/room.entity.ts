import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

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
}
