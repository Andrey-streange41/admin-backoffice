import { Module } from '@nestjs/common';
import { TracksController } from './tracks.controller';
import { TracksService } from './tracks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TracksEntity } from './tracks.entity';
import { FilesService } from 'src/modules/files/files.service';

@Module({
  imports: [TypeOrmModule.forFeature([TracksEntity])],
  exports: [TypeOrmModule],
  controllers: [TracksController],
  providers: [TracksService, FilesService],
})
export class TracksModule {}
