import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { EmailUniqueValidator } from './validation/email.validation';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import { RedisModule } from 'src/config/redis.module';
import { RedisService } from 'src/config/redis.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), RedisModule],
  controllers: [UserController],
  providers: [UserService, UserRepository, EmailUniqueValidator, RedisService],
  exports: [UserService],
})
export class UserModule {}
