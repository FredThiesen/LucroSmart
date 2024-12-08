import { Body, Injectable, Param } from '@nestjs/common';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Sale } from './sales.schema';
import { Model } from 'mongoose';
import { Business } from 'src/business/business.schema';

@Injectable()
export class SalesService {
  constructor(
    @InjectModel(Sale.name) private readonly saleModel: Model<Business>,
  ) {}
  create(@Body() createSaleDto: CreateSaleDto) {
    const newSale = new this.saleModel(createSaleDto);
    return newSale.save();
  }

  findAll() {
    return `This action returns all sales`;
  }

  findOne(@Param('id') id: string) {
    return this.saleModel.findById(id).exec();
  }

  update(@Param('id') id: string, @Body() updateSaleDto: UpdateSaleDto) {
    return this.saleModel
      .findByIdAndUpdate(id, updateSaleDto, { new: true })
      .exec();
  }

  remove(@Param('id') id: string) {
    return this.saleModel.findByIdAndDelete(id).exec();
  }
}
