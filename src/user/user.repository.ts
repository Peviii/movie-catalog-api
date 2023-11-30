import { Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';

@Injectable()
export class UserRepository {
  private users: UserEntity[] = [];

  async save(user: UserEntity) {
    this.users.push(user);
  }

  async list() {
    return this.users;
  }

  async emailExist(email: string) {
    const possibleUser = this.users.find((user) => user.email === email);
    return possibleUser !== undefined;
  }

  async listOnePerId(id: string) {
    const possibleUser = this.users.find((savedUser) => savedUser.id === id);
    if (!possibleUser) {
      throw new Error('User does not exist');
    }
    return possibleUser;
  }

  async update(id: string, dataUpdating: Partial<UserEntity>) {
    const user = this.listOnePerId(id);

    Object.entries(dataUpdating).forEach(([chave, valor]) => {
      if (chave === 'id') {
        return;
      }

      user[chave] = valor;
    });

    return user;
  }
  async delete(id: string) {
    const user = this.listOnePerId(id);
    this.users = this.users.filter((savedUser) => savedUser.id !== id);

    return user;
  }
}
