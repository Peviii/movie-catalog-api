import { Module } from '@nestjs/common';
import IORedis from 'ioredis';
import { RedisService } from './redis.service';

@Module({
  imports: [],
  providers: [
    {
      provide: 'REDIS',
      useValue: new IORedis({
        host: 'localhost', // Endereço do servidor Redis
        port: 6379, // Porta do servidor Redis
      }),
    },
    RedisService,
  ],
  exports: ['REDIS'],
})
export class RedisModule {}
