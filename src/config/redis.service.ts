import { Inject, Injectable } from '@nestjs/common';
import Redis, * as IORedis from 'ioredis';

@Injectable()
export class RedisService extends Redis {
  constructor(@Inject('REDIS') private readonly redis: IORedis.Redis) {
    super();
    super.on('error', (err) => {
      console.log('error on redis');
      console.log(err);
      process.exit(1);
    });
    super.on('connect', () => {
      console.log('redis connected');
    });
  }
}
