import {
  IsString,
  IsEmail,
  MinLength,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';
import { EmailUnique } from '../validation/email.validation';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDTO {
  @ApiProperty({
    description: 'nome do usuario',
    example: 'Olivia C. maggiore',
  })
  @IsString()
  @IsNotEmpty({ message: 'name uninformed' })
  @IsOptional()
  name: string;

  @ApiProperty({
    description: 'email do usuario',
    example: 'olivcmagg@mail.com',
  })
  @IsEmail(undefined, { message: 'email uninformed' })
  @EmailUnique({ message: 'email já existe' })
  @IsNotEmpty()
  @IsOptional()
  email: string;

  @ApiProperty({
    description: 'senha do usuario',
    example: '123abc!@#',
  })
  @MinLength(8, { message: 'needs at least 8 characters' })
  @IsNotEmpty()
  @IsOptional()
  password: string;
}
