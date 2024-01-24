import { IsEmail, IsString, Length } from 'class-validator';

export class LoginUserDTO {
  @IsEmail({}, { message: 'Invalid email format' })
  readonly email: string;

  @IsString({ message: 'Password must be a string' })
  @Length(8, 32, {
    message: 'Password must be between 8 and 32 characters long',
  })
  readonly password: string;
}
