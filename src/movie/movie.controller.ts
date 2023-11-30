import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { MovieDTO } from './dtos/movie.dto';
import { MovieEntity } from './movie.entity';
import { MovieRepository } from './movie.repository';
import { ListMovieDTO } from './dtos/list.dto';
import { v4 as uuid } from 'uuid';
import { UpdateMovieDTO } from './dtos/update.dto';
import { MovieService } from './movie.service';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('movies')
@ApiBearerAuth()
@Controller('/movies')
@UseGuards(AuthGuard('jwt'))
export class MovieController {
  constructor(
    private movieRepository: MovieRepository,
    private movieService: MovieService,
  ) {}

  @ApiOperation({ summary: 'Cadastra um filme' })
  @Post()
  async CreateMovie(@Body() dataMovie: MovieDTO) {
    const movieEntity = new MovieEntity();
    movieEntity.title = dataMovie.title;
    movieEntity.director = dataMovie.director;
    movieEntity.releaseYear = dataMovie.releaseYear;
    movieEntity.id = uuid();
    this.movieService.createMovie(movieEntity);
    return {
      movie: new ListMovieDTO(movieEntity.id, movieEntity.title),
      message: 'movie successfully created!',
    };
  }

  @ApiOperation({ summary: 'Lista todos os filme' })
  @Get()
  async ListMovies() {
    const savedMovies = await this.movieService.listMovies();
    return savedMovies;
  }

  @ApiOperation({ summary: 'Lista um filme por ID' })
  @ApiParam({
    name: 'id',
    description: 'ID do filme',
    example: 'cd2f5c26-9823-4568-8f5e-3cb4a1fe5b03',
  })
  @Get('/:id')
  async ListOneMovie(@Param('id') id: string) {
    const oneMovie = await this.movieService.listOneMovie(id);
    return { movie: oneMovie, message: 'movie found!' };
  }

  @ApiOperation({ summary: 'Atualiza um filme por ID' })
  @ApiParam({
    name: 'id',
    description: 'ID do filme',
    example: 'cd2f5c26-9823-4568-8f5e-3cb4a1fe5b03',
  })
  @ApiBody({
    type: UpdateMovieDTO,
    description: 'Corpo da solicitação para atualização do filme',
  })
  @Put('/:id')
  async UpdateMovie(
    @Param('id') id: string,
    @Body() updateData: UpdateMovieDTO,
  ) {
    const updated = await this.movieService.updateMovie(id, updateData);
    return { movie: updated, message: 'movie successfully updated!' };
  }

  @ApiOperation({ summary: 'Exclui um filme por ID' })
  @ApiParam({
    name: 'id',
    description: 'ID do filme',
    example: 'cd2f5c26-9823-4568-8f5e-3cb4a1fe5b03',
  })
  @Delete('/:id')
  async DeleteMovie(@Param('id') id: string) {
    const deleted = await this.movieService.deleteMovie(id);
    return { movie: deleted, message: 'movie successfully deleted!' };
  }
}
