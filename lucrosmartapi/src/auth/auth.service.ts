import { Body, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(@Body() user: any) {
    const payload = { username: user.username, password: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signUp(@Body() user: CreateUserDto) {
    return this.usersService.create(user);
  }
}