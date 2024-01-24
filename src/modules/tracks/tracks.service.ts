import { Injectable } from '@nestjs/common';
import { TracksEntity } from './tracks.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IInsertTrack, ITrack } from 'src/types/Tracks';
import { FilesService } from 'src/modules/files/files.service';
import { FileType } from 'src/modules/files/const';

@Injectable()
export class TracksService {
  constructor(
    @InjectRepository(TracksEntity)
    private tracksRepository: Repository<TracksEntity>,
    private filesModule: FilesService,
  ) {}
  async getAll(count = 10, offset = 0): Promise<ITrack[]> {
    return this.tracksRepository.find({
      skip: offset,
      take: count,
    });
  }
  async create(
    newTrack: IInsertTrack,
    picture: Express.Multer.File,
    audio: Express.Multer.File,
  ): Promise<ITrack> {
    const picturePath = this.filesModule.createFile(FileType.PICTURE, picture);
    const audioPath = this.filesModule.createFile(FileType.AUDIO, audio);
    const track = this.tracksRepository.create({
      ...newTrack,
      audio: audioPath,
      picture: picturePath,
      listens: 0,
    });
    return track;
  }

  async getOne(id: number): Promise<ITrack> {
    return this.tracksRepository.findOne({ where: { id } });
  }

  async delete(id: number): Promise<number> {
    const { affected } = await this.tracksRepository.delete(id);
    return affected;
  }
}
