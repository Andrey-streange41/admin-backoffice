import { IInsertTrack } from 'src/types/Tracks';
import { IsString, IsNotEmpty } from 'class-validator';
import { IsAudioFile } from 'src/common/decorators/is-audio-file.decorator';

export class TracksDTO {
  @IsString()
  @IsNotEmpty()
  private readonly title: string;

  @IsString()
  @IsNotEmpty()
  @IsAudioFile({ message: 'Audio must be a valid file' })
  private readonly audio: string;

  @IsString()
  private readonly picture: string;

  @IsString()
  private readonly text: string;
  constructor({ title, audio, picture, text }: IInsertTrack) {
    this.title = title;
    this.audio = audio;
    this.picture = picture;
    this.text = text;
  }
}
