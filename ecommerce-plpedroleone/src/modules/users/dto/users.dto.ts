import { PartialType } from '@nestjs/mapped-types';
import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  Validate,
} from 'class-validator';
import { MatchPassword } from '../../../helpers/matchPassword';

export class CreateUserDto {

  /**
   * @example Pedro
   */
  @IsNotEmpty()
  @IsString()
  @MinLength(3, { message: 'Name is too short' })
  @MaxLength(80, { message: 'Name is too long' })
  name: string;

  /**
   * @example pl@mail.com
   */  
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(50, { message: 'Email is too long' })
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
  @MinLength(8, { message: 'Password is too short' })
  @MaxLength(15, { message: 'Password is too long' })
  password: string;

  /**
   * @example Admin123.
   */
  @IsNotEmpty()
  @Validate(MatchPassword, ['password'])
  confirmPassword: string;

  /**
   * @example Calle 5
   */
  @IsNotEmpty()
  @IsString()
  @MinLength(3, { message: 'Adress is too short' })
  @MaxLength(80, { message: 'Adress is too long' })
  address: string;

  /**
   * @example 1123157862
   */
  @IsNotEmpty()
  @IsInt({ message: 'Phone number should be an integer number' })
  phone: number;

  /**
   * @example Argentina
   */
  @IsNotEmpty()
  @IsString()
  @MinLength(5, { message: 'Country name is too short' })
  @MaxLength(20, { message: 'Country name is too long' })
  country: string;

  /**
   * @example Buenos Aires
   */
  @IsNotEmpty()
  @IsString()
  @MinLength(5, { message: 'City name is too short' })
  @MaxLength(20, { message: 'City name is too long' })
  city: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
