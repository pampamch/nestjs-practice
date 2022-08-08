import { Inject, Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { User } from 'src/typeorm';
import { UsersService } from 'src/users/services/users.service';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(
    @Inject('USER_SERVICE') private readonly userService: UsersService,
  ) {
    super();
  }

  serializeUser(user: User, done: (err, user: User) => void) {
    console.log('Serialized User');

    done(null, user);
  }

  async deserializeUser(user: User, done: (err, user: User) => void) {
    console.log('Deserialized User');
    const userDB = await this.userService.findUserById(user.id);
    return userDB ? done(null, user) : done(null, null);
  }
}
