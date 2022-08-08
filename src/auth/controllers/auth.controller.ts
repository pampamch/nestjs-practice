import {
  Controller,
  Get,
  Inject,
  Post,
  Req,
  Session,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { JWTAuthGuard } from '../guards/jwt-auth.guard';
import RequestWithUser from '../interfaces/RequestWithUser';
import { AuthService } from '../services/auth.service';
import { AuthenticatedGuard, LocalAuthGuard } from '../utils/LocalGuard';

@Controller('auth')
export class AuthController {
  constructor(@Inject('AUTH_SERVICE') private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: RequestWithUser) {
    console.log(req.user);
    const accessToken = this.authService.getAccessToken(req.user);
    return {
      accessToken,
    };
  }

  @Get()
  async getAuthSession(@Session() session: Record<string, any>) {
    console.log(session);
    console.log(session.id);
    session.authenticated = true;
    return session;
  }

  @UseGuards(AuthenticatedGuard)
  @Get('status')
  async getAuthStatus(@Req() req: Request) {
    console.log(req.user);
    return req.user;
  }

  @UseGuards(JWTAuthGuard)
  @Get('profile')
  getProfile(@Req() req: Request) {
    return req.user;
  }
}
