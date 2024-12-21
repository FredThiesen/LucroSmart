import { Body, HttpException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && user.password === pass) {
      return user;
    }
    return null;
  }

  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);
    if (!user) {
      throw new HttpException('Invalid credentials', 401);
    }
    const payload = { username: user.username, sub: user.userId };
    const accessToken = this.jwtService.sign(payload, { expiresIn: '60s' });

    //check if user has a refresh token and if it is valid. If not, create a new one
    if (!user.refreshToken) {
      const refreshToken = this.jwtService.sign(payload, {
        expiresIn: '7d',
        secret: process.env.JWT_REFRESH_SECRET,
      });
      await this.usersService.saveRefreshToken(user._id, refreshToken); // Salve no banco de dados
    }

    return {
      access_token: accessToken,
    };
  }

  async validateRefreshToken(refreshToken: string) {
    const user = await this.usersService.findByRefreshToken(refreshToken);
    if (!user) {
      throw new HttpException('Invalid refresh token', 401);
    }
    return user;
  }
}
