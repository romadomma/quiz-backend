import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quiz } from '../entities/quiz.entity';

@Injectable()
export class QuizService {
  constructor(
    @InjectRepository(Quiz)
    private readonly quizzesRepository: Repository<Quiz>,
  ) {}

  async findAll(ownerId: number): Promise<Quiz[]> {
    return await this.quizzesRepository.find({
      where: {
        ownerId,
      },
      order: {
        updatedAt: 'ASC',
      },
      withDeleted: false,
    });
  }
}
