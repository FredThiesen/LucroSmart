import { Body, Injectable, Param } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateSupplyDto } from './dto/create-supply.dto';
import { UpdateSupplyDto } from './dto/update-supply.dto';
import { Supply } from './supplies.schema';

@Injectable()
export class SuppliesService {
  constructor(
    @InjectModel(Supply.name) private readonly supplyModel: Model<Supply>,
  ) {}

  async create(createSupplyDto: CreateSupplyDto): Promise<Supply> {
    const newSupply = new this.supplyModel(createSupplyDto);
    return newSupply.save();
  }

  async findAll(): Promise<Supply[]> {
    return this.supplyModel.find().exec();
  }

  async findOne(@Param('id') id: string): Promise<Supply | null> {
    return this.supplyModel.findById(id).exec();
  }

  async update(
    @Param('id') id: string,
    @Body() updateSupplyDto: UpdateSupplyDto,
  ): Promise<Supply | null> {
    return this.supplyModel
      .findByIdAndUpdate(id, updateSupplyDto, { new: true })
      .exec();
  }

  async remove(@Param('id') id: string): Promise<Supply | null> {
    return this.supplyModel.findByIdAndDelete(id).exec();
  }
}
