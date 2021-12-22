import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Room } from '../entities/room.entity';
import * as crypto from 'crypto';
import { RuntimeException } from '@nestjs/core/errors/exceptions/runtime.exception';
import { User } from '../entities/user.entity';

type CreateProps = {
  adminId: number;
  quizId: number;
};

@Injectable()
export class RoomService {
  create({ adminId, quizId }: CreateProps) {
    for (let i = 0; i < 3; i++) {
      try {
        const room = this.roomsRepository.create({
          adminId,
          quizId,
          code: crypto.randomBytes(3).toString('hex').toUpperCase(),
        });

        return this.roomsRepository.save(room);
      } catch (e) {
        console.error('Сгенерирован код, который уже существует в БД');
      }
    }
    throw new RuntimeException('Ошибка создания комнаты');
  }

  constructor(
    @InjectRepository(Room)
    private readonly roomsRepository: Repository<Room>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async saveRoomUser(userId: number, code: string) {
    const room = await this.roomsRepository.findOne({
      where: {
        code,
      },
      withDeleted: false,
    });
    const user = await this.usersRepository.findOneOrFail(userId, {
      relations: ['users'],
    });
    room.users.push(user);
    return this.roomsRepository.save(room);
  }
}
