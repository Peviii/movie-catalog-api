import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieEntity } from './movie.entity';
import { MovieController } from './movie.controller';
import { MovieRepository } from './movie.repository';
import { MovieService } from './movie.service';
import { RedisService } from 'src/config/redis.service';
import { RedisModule } from 'src/config/redis.module';

@Module({
  imports: [TypeOrmModule.forFeature([MovieEntity]), RedisModule],
  controllers: [MovieController],
  providers: [MovieService, MovieRepository, RedisService],
})
export class MovieModule {}
