import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { ConfigModule } from '@nestjs/config';
import { userConfigFactory } from './user.config';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';

@Module({
  controllers: [UserController],
  imports: [
    ConfigModule.forFeature(userConfigFactory),
    TypeOrmModule.forFeature([User]),
  ],
  providers: [UserService],
})
export class UserModule {}
