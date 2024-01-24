import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import * as path from 'path';
import { configDataBase } from './config';

import { AppService } from './app.service';

import { AppController } from './app.controller';

import { TracksEntity } from './modules/tracks/tracks.entity';

import { TracksModule } from './modules/tracks/tracks.module';
import { CommentsModule } from './modules/comments/comments.module';
import { FilesModule } from './modules/files/files.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { UserModule } from './modules/user/user.module';
import { UserEntity } from './modules/user/user.entity';
import { WrongPasswordEntity } from './entities/WrongPasswordEntity';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static'),
    }),
    TypeOrmModule.forRoot({
      ...configDataBase,
      entities: [TracksEntity, UserEntity, WrongPasswordEntity],
      synchronize: true, // not for prodaction
      type: 'mysql',
    }),
    TracksModule,
    CommentsModule,
    FilesModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
