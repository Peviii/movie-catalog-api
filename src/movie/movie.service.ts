import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ListMovieDTO } from './dtos/list.dto';
import { UpdateMovieDTO } from './dtos/update.dto';
import { MovieEntity } from './movie.entity';
import { RedisService } from 'src/config/redis.service';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(MovieEntity)
    private readonly movieRepository: Repository<MovieEntity>,
    private readonly redis: RedisService,
  ) {}

  async createMovie(movieEntity: MovieEntity) {
    await this.movieRepository.save(movieEntity);
  }
  async listMovies() {
    const cachedMovies = await this.redis.get('movie-entity');
    if (cachedMovies) {
      console.log('\x1b[36m%s\x1b[B', 'From Cache');
      return JSON.parse(cachedMovies);
    }
    const movies = await this.movieRepository.find();
    await this.redis.set('movie-entity', JSON.stringify(movies), 'EX', 15);
    console.log('\x1b[33m%s\x1b[B', 'From Database');

    const moviesList = movies.map(
      (movie) => new ListMovieDTO(movie.id, movie.title),
    );
    return moviesList;
  }
  async listOneMovie(id: string) {
    const oneMovie = await this.movieRepository.findOne({
      where: {
        id: id,
      },
    });
    await this.redis.set('movie-entity', JSON.stringify(oneMovie), 'EX', 15);
    console.log('\x1b[33m%s\x1b[B', 'From Database');
    return oneMovie;
  }
  async updateMovie(id: string, updateEntity: UpdateMovieDTO) {
    await this.movieRepository.update(id, updateEntity);
  }
  async deleteMovie(id: string) {
    await this.movieRepository.delete(id);
  }
}
