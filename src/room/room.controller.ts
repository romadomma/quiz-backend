import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/create-room.dto';

@Controller('room')
export class RoomController {
  constructor(private roomService: RoomService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Req() req, @Body(new ValidationPipe()) { quizId }: CreateRoomDto) {
    return this.roomService.create({
      adminId: req.user.id,
      quizId,
    });
  }
}
