import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { JwtAuthGuard } from '../auth/jwt.guard';

@Controller('quiz')
export class QuizController {
  constructor(private quizService: QuizService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(@Req() req) {
    return this.quizService.findAll(req.user.id);
  }
}
