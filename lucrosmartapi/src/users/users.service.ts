import { Body, HttpException, Injectable, Param } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './users.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  create(@Body() createUserDto: CreateUserDto) {
    try {
      const newUser = new this.userModel(createUserDto);
      newUser.save();
      return newUser;
    } catch (error) {
      throw new Error(`Error creating user: ${error.message}`);
    }
  }

  findOne(id: string) {
    return this.userModel.findById(id).exec();
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel.findByIdAndUpdate(id, updateUserDto).exec();
  }

  remove(id: string) {
    return this.userModel.findByIdAndDelete(id).exec();
  }

  findByEmail(email: string) {
    return this.userModel.findOne({ email });
  }

  async saveRefreshToken(id: string, refreshToken: string) {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new HttpException('User not found', 404);
    }

    user.refreshToken = refreshToken;
    await user.save();
  }

  async findByRefreshToken(refreshToken: string) {
    return this.userModel.findOne({ where: { refreshToken } });
  }
}
