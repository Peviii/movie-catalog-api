import { Injectable } from '@nestjs/common';
import { MovieEntity } from './movie.entity';

@Injectable()
export class MovieRepository {
  private movies: MovieEntity[] = [];

  async save(movie: MovieEntity) {
    this.movies.push(movie);
  }

  async list() {
    return this.movies;
  }

  async listOnePerId(id: string) {
    const possibleMovie = this.movies.find(
      (savedMovie) => savedMovie.id === id,
    );
    if (!possibleMovie) throw new Error('Movie does not exist');
    return possibleMovie;
  }

  async update(id: string, data: Partial<MovieEntity>) {
    const movie = this.listOnePerId(id);

    Object.entries(data).forEach(([key, value]) => {
      if (key === 'id') {
        return;
      }

      movie[key] = value;
    });
    return movie;
  }

  async delete(id: string) {
    const movie = this.listOnePerId(id);
    this.movies = this.movies.filter((savedMovie) => savedMovie.id !== id);

    return movie;
  }
}
