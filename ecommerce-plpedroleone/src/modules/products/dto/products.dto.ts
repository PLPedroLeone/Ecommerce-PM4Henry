import { PartialType } from '@nestjs/mapped-types';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3, { message: 'Product name too short' })
  @MaxLength(50, { message: 'Product name too long' })
  name: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(10, { message: 'Product name too short' })
  @MaxLength(100, { message: 'Product name too long' })
  description: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  price: number;

  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  stock: number;

  @IsUrl()
  @IsOptional()
  imgUrl?: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3, { message: 'Category name too short' })
  @MaxLength(50, { message: 'Category name too long' })
  category: string;
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}
