import { IsNumber } from 'class-validator';

export class CreateRoomDto {
  @IsNumber()
  quizId: number;
}
