import { Body, HttpException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(identifier: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmailOrId(identifier);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(@Body() data: any) {
    const user = await this.validateUser(data.email, data.password);
    if (!user) {
      throw new HttpException('Invalid credentials', 401);
    }

    const payload = { username: user.username, sub: user.userId };
    const accessToken = this.jwtService.sign(payload, { expiresIn: '60s' });

    const refreshToken = uuidv4(); // Gera um UUID para o refresh token
    await this.usersService.saveRefreshToken(user._id, refreshToken); // Salve no banco de dados

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
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
