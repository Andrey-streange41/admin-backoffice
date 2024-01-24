import {
  Body,
  Controller,
  Post,
  Req,
  UnauthorizedException,
  UsePipes,
} from '@nestjs/common';
import { RefreshTokenPipe, UserLoginPipe } from './user.pipe';
import { UserService } from './user.service';
import { Request } from 'express';
import { LoginUserDTO } from './user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {
    this.userService = userService;
  }

  @Post('/auth')
  @UsePipes(new UserLoginPipe())
  async login(
    @Body() user: LoginUserDTO,
    @Req() request: Request,
  ): Promise<
    UnauthorizedException | { accessToken: string; refreshToken: any }
  > {
    const successful = await this.userService.login(user, request.ip);

    return successful;
  }

  @Post('/refresh-tokens')
  @UsePipes(new RefreshTokenPipe())
  async refreshTokens(
    @Body() body: { refreshToken: string },
    @Req() request: Request,
  ) {
    return this.userService.refreshTokens(body.refreshToken, request.ip);
  }
}
