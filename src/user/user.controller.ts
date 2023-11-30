import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserDTO } from './dtos/user.dto';
import { UserEntity } from './user.entity';
import { UserRepository } from './user.repository';
import { ListUserDTO } from './dtos/list.dto';
import { v4 as uuid } from 'uuid';
import { UpdateUserDTO } from './dtos/update.dto';
import { UserService } from './user.service';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('/users')
export class UserController {
  constructor(
    private userRepository: UserRepository,
    private userService: UserService,
  ) {}

  @ApiOperation({ summary: 'Cadastra um usuario' })
  @Post()
  async CreateUser(@Body() dataUser: UserDTO) {
    const userEntity = new UserEntity();
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(dataUser.password, salt);

    userEntity.name = dataUser.name;
    userEntity.email = dataUser.email;
    userEntity.password = hashedPassword;
    userEntity.id = uuid();

    this.userService.createUser(userEntity);
    return {
      user: new ListUserDTO(userEntity.id, userEntity.name),
      message: 'user successfully created!',
    };
  }

  @ApiOperation({ summary: 'Lista todos os usuarios' })
  @Get()
  async ListUsers() {
    const savedUsers = await this.userService.listUsers();
    return savedUsers;
  }

  @ApiOperation({ summary: 'Lista um usuario por ID' })
  @ApiParam({
    name: 'id',
    description: 'ID do usuario',
    example: 'b09fde07-01c4-4f8a-bd1e-a9b32a20abc5',
  })
  @Get('/:id')
  async ListOneMovie(@Param('id') id: string) {
    const oneUser = await this.userService.listOne(id);
    return oneUser;
  }

  @ApiOperation({ summary: 'Atualiza um usuario por ID' })
  @ApiParam({
    name: 'id',
    description: 'ID do usuario',
    example: 'b09fde07-01c4-4f8a-bd1e-a9b32a20abc5',
  })
  @ApiBody({
    type: UpdateUserDTO,
    description: 'Corpo da solicitação para atualização do usuario',
  })
  @Put('/:id')
  async UpdateUser(@Param('id') id: string, @Body() updateData: UpdateUserDTO) {
    const updated = await this.userService.updateUser(id, updateData);
    return { user: updated, message: 'user successfully updated!' };
  }

  @ApiOperation({ summary: 'Exclui um usuario por ID' })
  @ApiParam({
    name: 'id',
    description: 'ID do usuario',
    example: 'b09fde07-01c4-4f8a-bd1e-a9b32a20abc5',
  })
  @Delete('/:id')
  async deleteUser(@Param('id') id: string) {
    const deleted = await this.userService.deleteUser(id);
    return { usuario: deleted, message: 'user successfully deleted!' };
  }
}
