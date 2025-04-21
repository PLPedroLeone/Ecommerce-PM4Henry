import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class LoginUserDto {
  /**
   * @example pl@mail.com
   */
  @IsNotEmpty()
  @IsEmail()
  email: string;

  /**
   * @example Admin123.
   */
  @IsNotEmpty()
  @IsString()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*.-])/, {
    message:
      'Password must contain al least one uppercase letter, one lowercase letter, one number and one special character',
  })
  @MinLength(8)
  @MaxLength(15)
  password: string;
}
