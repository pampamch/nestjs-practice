import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/typeorm';
import { UsersService } from 'src/users/services/users.service';
import { comparePassword } from 'src/utils/bcrypt';
import { JWTUserPayload } from '../interfaces/JWTUserPayload';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_SERVICE') private readonly userService: UsersService,
    private jwtService: JwtService,
  ) {}
  async validateUser(username: string, password: string) {
    const userDB = await this.userService.findUserByUsername(username);
    if (userDB) {
      const matched = comparePassword(password, userDB.password);
      if (matched) {
        return userDB;
      } else {
        console.log('Password not matched');
        return null;
      }
    }
    return null;
  }

  getAccessToken(user: User): string {
    const payload: JWTUserPayload = { username: user.username, sub: user.id };
    return this.jwtService.sign(payload);
  }
}
