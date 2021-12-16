import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Room } from '../entities/room.entity';
import * as crypto from 'crypto';
import { RuntimeException } from '@nestjs/core/errors/exceptions/runtime.exception';

type CreateProps = {
  adminId: number;
  quizId: number;
};

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room)
    private readonly roomsRepository: Repository<Room>,
  ) {}

  create({ adminId, quizId }: CreateProps) {
    for (let i = 0; i < 3; i++) {
      try {
        return this.roomsRepository.create({
          adminId,
          quizId,
          code: crypto.randomBytes(3).toString('hex').toUpperCase(),
        });
      } catch (e) {
        console.error('Сгенерирован код, который уже существует в БД');
      }
    }
    throw new RuntimeException('Ошибка создания комнаты');
  }
}
