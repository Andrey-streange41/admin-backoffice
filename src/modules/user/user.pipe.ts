import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { SECRET_JWT } from 'src/config';

@Injectable()
export class UserLoginPipe implements PipeTransform {
  async transform(value: any) {
    const { email, password } = value;

    if (!email || !password) {
      throw new BadRequestException('Username and password are required');
    }
    return value;
  }
}

@Injectable()
export class RefreshTokenPipe implements PipeTransform {
  async transform(value: any) {
    const refreshToken: any = jwt.verify(value.refreshToken, SECRET_JWT);

    if (refreshToken.type !== 'refresh') {
      throw new BadRequestException('Invalid token');
    }
  }
}
