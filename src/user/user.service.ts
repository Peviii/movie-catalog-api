import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ListUserDTO } from './dtos/list.dto';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { UpdateUserDTO } from './dtos/update.dto';
import { RedisService } from 'src/config/redis.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly redis: RedisService,
  ) {}
  async createUser(userEntity: UserEntity) {
    await this.userRepository.save(userEntity);
  }

  async listUsers() {
    const cachedMovies = await this.redis.get('user-entity');
    if (cachedMovies) {
      console.log('\x1b[36m%s\x1b[B', 'From Cache');
      return JSON.parse(cachedMovies);
    }
    const users = await this.userRepository.find();
    await this.redis.set('user-entity', JSON.stringify(users), 'EX', 15);
    console.log('\x1b[33m%s\x1b[B', 'From Database');

    const usersList = users.map((user) => new ListUserDTO(user.id, user.name));
    return usersList;
  }

  async listOne(id: string) {
    const oneUser = await this.userRepository.findOne({
      where: {
        id: id,
      },
    });
    await this.redis.set('user-entity', JSON.stringify(oneUser), 'EX', 15);
    console.log('\x1b[33m%s\x1b[B', 'From Database');
    return oneUser;
  }

  async listOneByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email: email },
    });
    return user;
  }

  async updateUser(id: string, userEntity: UpdateUserDTO) {
    await this.userRepository.update(id, userEntity);
  }

  async deleteUser(id: string) {
    await this.userRepository.delete(id);
  }
}
