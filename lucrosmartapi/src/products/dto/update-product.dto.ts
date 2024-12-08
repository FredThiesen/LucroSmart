import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { IsString, IsNumber, IsArray, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { Supply } from 'src/supplies/supplies.schema';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @IsString()
  description?: string;

  @IsNumber()
  total?: number;

  @IsArray()
  @Type(() => Supply)
  supplies?: Supply[];

  @IsString()
  unit?: string;
}
