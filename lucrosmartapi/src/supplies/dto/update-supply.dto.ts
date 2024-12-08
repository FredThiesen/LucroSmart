import { PartialType } from '@nestjs/mapped-types';
import { CreateSupplyDto } from './create-supply.dto';
import { IsOptional, IsString, IsNumber } from 'class-validator';

export class UpdateSupplyDto extends PartialType(CreateSupplyDto) {
  @IsOptional()
  @IsString()
  name?: string; // Nome atualizado do insumo (opcional)

  @IsOptional()
  @IsNumber()
  price?: number; // Preço atualizado do insumo (opcional)

  @IsOptional()
  @IsString()
  unit?: string; // Unidade atualizada do insumo (opcional)

  @IsOptional()
  @IsString()
  description?: string; // Descrição atualizada do insumo (opcional)
}
