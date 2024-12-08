import { PartialType } from '@nestjs/swagger';
import { CreateBusinessDto } from './create-business.dto';
import { IsArray, IsOptional, IsString } from 'class-validator';
import { User } from 'src/users/users.schema';

export class UpdateBusinessDto extends PartialType(CreateBusinessDto) {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  profilePicture: string;

  @IsOptional()
  @IsArray()
  members: User[];

  @IsOptional()
  @IsString()
  products: string;

  @IsOptional()
  @IsString()
  sales: string;
}
