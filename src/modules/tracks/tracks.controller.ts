import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { TracksService } from './tracks.service';
import { IInsertTrack } from 'src/types/Tracks';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller('/tracks')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Get()
  getAll(@Query('count') count: number, @Query('offset') offset: number) {
    return this.tracksService.getAll(count, offset);
  }

  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.tracksService.getOne(id);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.tracksService.delete(id);
  }

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      {
        name: 'picture',
        maxCount: 1,
      },
      {
        name: 'audio',
        maxCount: 1,
      },
    ]),
  )
  create(
    @UploadedFiles()
    files: { picture: Express.Multer.File[]; audio: Express.Multer.File[] },
    @Body() body: IInsertTrack,
  ) {
    const { picture, audio } = files;
    return this.tracksService.create(body, picture[0], audio[0]);
  }
}
