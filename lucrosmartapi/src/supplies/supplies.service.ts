import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateSupplyDto } from './dto/create-supply.dto';
import { UpdateSupplyDto } from './dto/update-supply.dto';
import { Supply } from './supplies.schema'; // Supondo que você tenha criado um schema chamado Supply

@Injectable()
export class SuppliesService {
  constructor(
    @InjectModel(Supply.name) private readonly supplyModel: Model<Supply>, // Injeta o modelo do Supply
  ) {}

  // Cria um novo supply
  async create(createSupplyDto: CreateSupplyDto): Promise<Supply> {
    const newSupply = new this.supplyModel(createSupplyDto);
    return newSupply.save(); // Salva o novo supply no banco de dados
  }

  // Retorna todos os supplies
  async findAll(): Promise<Supply[]> {
    return this.supplyModel.find().exec(); // Encontra todos os supplies
  }

  // Retorna um supply específico pelo ID
  async findOne(id: string): Promise<Supply | null> {
    return this.supplyModel.findById(id).exec(); // Encontra o supply pelo ID
  }

  // Atualiza um supply existente
  async update(
    id: string,
    updateSupplyDto: UpdateSupplyDto,
  ): Promise<Supply | null> {
    return this.supplyModel
      .findByIdAndUpdate(id, updateSupplyDto, { new: true })
      .exec();
    // Atualiza e retorna o supply atualizado
  }

  // Remove um supply pelo ID
  async remove(id: string): Promise<Supply | null> {
    return this.supplyModel.findByIdAndDelete(id).exec(); // Deleta o supply pelo ID
  }
}
