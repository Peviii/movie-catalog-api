import { IsString, IsEmail, MinLength, IsNotEmpty } from 'class-validator';
import { EmailUnique } from '../validation/email.validation';
import { ApiProperty } from '@nestjs/swagger';

export class UserDTO {
  @ApiProperty({
    description: 'nome do usuario',
    example: 'Olivia Chiara',
  })
  @IsString()
  @IsNotEmpty({ message: 'name uninformed' })
  name: string;

  @ApiProperty({
    description: 'email do usuario',
    example: 'Olivia@mail.com',
  })
  @IsEmail(undefined, { message: 'email uninformed' })
  @EmailUnique({ message: 'email already exists' })
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'senha do usuario',
    example: '123abc!@#',
  })
  @MinLength(6, { message: 'needs at least 6 characters' })
  @IsNotEmpty({ message: 'password uninformed' })
  password: string;
}
