import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { User as UserEntity } from 'src/typeorm';
import { SerializedUser, User } from 'src/users/types';
import { encodePassword } from 'src/utils/bcrypt';
import { Repository } from 'typeorm';
import { CreateUserDTO } from '../dto/User.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  private users: User[] = [];

  getUsers() {
    return this.users.map((user) => plainToClass(SerializedUser, user));
    // return this.users.map((user) => new SerializedUser(user)); << or this way
  }

  getUserByUsername(username: string) {
    return this.users.find((user) => user.username === username);
  }

  getUserbyId(id: number) {
    return this.users.find((user) => user.id === id);
  }

  createUser(createUserDTO: CreateUserDTO) {
    const password = encodePassword(createUserDTO.password);
    console.log(password);
    const newUser = this.userRepository.create({ ...createUserDTO, password });
    return this.userRepository.save(newUser);
  }

  findUserByUsername(username: string) {
    return this.userRepository.findOne({ where: { username } });
  }

  findUserById(id: number) {
    return this.userRepository.findOne({ where: { id } });
  }
}
