import {
  Controller,
  Request,
  Post,
  UseGuards,
  Get,
  Body,
  HttpException,
} from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { AuthLoginDto } from './dto/auth-login.dto';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('login')
  login(@Body() data: AuthLoginDto) {
    return this.authService.login(data.email, data.password);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(LocalAuthGuard)
  @Post('logout')
  async logout(@Request() req) {
    return req.logout();
  }

  @Post('refresh')
  async refresh(@Body() body) {
    const { refresh_token } = body;

    const user = await this.authService.validateRefreshToken(refresh_token);
    if (!user) {
      throw new HttpException('Invalid refresh token', 401);
    }

    const payload = { username: user.email, sub: user._id };
    const newAccessToken = this.jwtService.sign(payload, { expiresIn: '60s' });

    return {
      access_token: newAccessToken,
    };
  }
}
