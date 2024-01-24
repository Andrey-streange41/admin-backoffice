import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import moment from 'moment';
import { WrongPasswordEntity } from 'src/entities/WrongPasswordEntity';
import { generateTokens } from 'src/core/generateTokens';
import * as jwt from 'jsonwebtoken';
import { SECRET_JWT } from 'src/config';
import { LoginUserDTO } from './user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private dataSource: Repository<UserEntity>,
  ) {}

  async login(userDTO: LoginUserDTO, ip: string) {
    const user = await this.dataSource.findOne({
      where: { email: userDTO.email },
      relations: ['wrong_password'],
    });

    if (!user) {
      throw new NotFoundException(
        `User with username '${userDTO.email}' not found`,
      );
    }

    if (user.wrong_password?.amount === 5) {
      const today = moment();
      const blockTime = moment(user.wrong_password.updated_at).add(1, 'h');
      if (blockTime >= today) {
        throw new UnauthorizedException({
          message: `Кількість спроб вводу паролю перевищена, спробуйте о ${blockTime.format(
            'H:m DD.MM.YYYY',
          )}`,
        });
      } else {
        await user.wrong_password.remove();
      }
    }

    const passwordResult = bcrypt.compareSync(userDTO.password, user.password);

    if (!passwordResult) {
      if (user.wrong_password) {
        user.wrong_password.amount = user.wrong_password.amount + 1;
        await user.wrong_password.save();
      } else {
        user.wrong_password = new WrongPasswordEntity();
        user.wrong_password.user_id = user.id;
        await user.wrong_password.save();
      }

      throw new UnauthorizedException({
        message: 'Введіть правильно пароль або логін',
      });
    }
    const tokens = generateTokens(user, ip);

    await this.dataSource.update(user.id, { updated_at: new Date() });

    return {
      accessToken: `Bearer ${tokens.accessToken}`,
      refreshToken: tokens.refreshToken,
    };
  }

  async refreshTokens(token: string, ip: string) {
    const refreshToken: any = jwt.verify(token, SECRET_JWT);
    const tokens = generateTokens(refreshToken, ip);
    await this.dataSource.update(refreshToken.id, {
      updated_at: new Date(),
    });
    return {
      accessToken: `Bearer ${tokens.accessToken}`,
      refreshToken: tokens.refreshToken,
    };
  }
}
