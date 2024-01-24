import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { APP_FILTER } from '@nestjs/core';
import { UserFilter } from './user.filter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { WrongPasswordEntity } from 'src/entities/WrongPasswordEntity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, WrongPasswordEntity])],
  exports: [TypeOrmModule],
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: APP_FILTER,
      useClass: UserFilter,
    },
  ],
})
export class UserModule {}
