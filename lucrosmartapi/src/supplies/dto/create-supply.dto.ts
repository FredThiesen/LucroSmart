import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateSupplyDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsString()
  unit: string;

  @IsOptional()
  @IsString()
  description?: string;
}
