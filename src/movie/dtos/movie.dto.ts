import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class MovieDTO {
  @ApiProperty({
    description: 'titulo do filme',
    example: 'Titanic',
  })
  @IsString()
  @IsNotEmpty({ message: 'title uninformed' })
  title: string;

  @ApiProperty({
    description: 'diretor do filme',
    example: 'James Cameron',
  })
  @IsString()
  @IsNotEmpty({ message: 'director uninformed' })
  director: string;

  @ApiProperty({
    description: 'ano de lancamento do filme',
    example: 1998,
  })
  @IsNumber()
  @IsNotEmpty({ message: 'release year uninformed' })
  releaseYear: number;
}
