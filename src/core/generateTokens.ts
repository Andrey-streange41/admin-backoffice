import jwt from 'jsonwebtoken';
import { SECRET_JWT } from '../config/index';
import { IUser } from 'src/types/User';

export const generateTokens = (user: IUser, ipAddress: string) => {
  const accessToken = jwt.sign(
    {
      id: user.id,
      email: user.email,
      fio: user.fio,

      type: 'access',
    },
    SECRET_JWT,
    { expiresIn: '1h' },
  );
  const refreshToken = jwt.sign(
    {
      id: user.id,
      username: user.email,
      fio: user.fio,
      type: 'refresh',
      ipAddress: ipAddress,
    },
    SECRET_JWT,
    { expiresIn: '7d' },
  );

  return { accessToken, refreshToken };
};
