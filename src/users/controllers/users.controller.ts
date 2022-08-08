import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  UseFilters,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthenticatedGuard } from 'src/auth/utils/LocalGuard';
import { UsersService } from 'src/users/services/users.service';
import { SerializedUser } from 'src/users/types';
import { CreateUserDTO } from '../dto/User.dto';
import { UserNotFoundException } from '../exceptions/UserNotFound.exception';
import { HttpExceptionFilter } from '../filters/HttpException.filter';

@Controller('users')
export class UsersController {
  constructor(
    @Inject('USER_SERVICE') private readonly usersService: UsersService,
  ) {}

  @UseGuards(AuthenticatedGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  getAllUsers() {
    return this.usersService.getUsers();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('username/:username')
  getByUsername(@Param('username') username: string) {
    const user = this.usersService.getUserByUsername(username);
    if (user) return new SerializedUser(user);
    else throw new HttpException('User not found.', HttpStatus.BAD_REQUEST);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @UseFilters(HttpExceptionFilter) // pass exception filter that you create in @UseFilters decorator
  @Get('id/:id')
  getById(@Param('id', ParseIntPipe) id: number) {
    const user = this.usersService.getUserbyId(id);
    if (user) return new SerializedUser(user);
    else throw new UserNotFoundException(); //>> create class by yourself
    // else throw new NotFoundException(); //>> use built-in exception
    // else throw new UserNotFoundException('User was not found.', 400); //<< you can change response by overwritting in the parentheses
  }

  @Post('create')
  @UsePipes(ValidationPipe)
  createUser(@Body() createUserDTO: CreateUserDTO) {
    return this.usersService.createUser(createUserDTO);
  }
}
