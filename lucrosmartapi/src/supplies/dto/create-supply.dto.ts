import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateSupplyDto {
  @IsNotEmpty()
  @IsString()
  name: string; // Nome do insumo

  @IsNotEmpty()
  @IsNumber()
  price: number; // Preço do insumo por unidade

  @IsNotEmpty()
  @IsString()
  unit: string; // Quantidade inicial do insumo

  @IsOptional()
  @IsString()
  description?: string; // Descrição do insumo (opcional)
}
