import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateMovieDTO {
  @ApiProperty({
    description: 'titulo do filme',
    example: 'Titanic 2',
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  title: string;

  @ApiProperty({
    description: 'diretor do filme',
    example: 'James Cameron',
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  director: string;

  @ApiProperty({
    description: 'ano de lancamento do filme',
    example: 2002,
  })
  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  releaseYear: number;
}
