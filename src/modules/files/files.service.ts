import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FileType } from './const';
import * as path from 'path';
import * as fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class FilesService {
  createFile(type: FileType, file: Express.Multer.File): string {
    try {
      const fileId: string = uuidv4();
      const fileExtention = file.originalname.split('.').pop();
      console.log(fileId);
      const filePath = path.resolve(__dirname, '..', 'static', type);

      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }
      fs.writeFileSync(
        path.resolve(filePath, fileId + `.${fileExtention}`),
        file.buffer,
      );
      return `${type}/${fileId}.${fileExtention}`;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  removeFile(filename: string) {
    console.log(filename);
  }
}
