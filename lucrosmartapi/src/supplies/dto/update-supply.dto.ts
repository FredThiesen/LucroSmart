import { PartialType } from '@nestjs/mapped-types';
import { CreateSupplyDto } from './create-supply.dto';
import { IsOptional, IsString, IsNumber } from 'class-validator';

export class UpdateSupplyDto extends PartialType(CreateSupplyDto) {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsNumber()
  price?: number;

  @IsOptional()
  @IsString()
  unit?: string;

  @IsOptional()
  @IsString()
  description?: string;
}
