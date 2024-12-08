import { Body, Injectable, Param } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './products.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>, // Injeta o modelo do Product
  ) {}

  create(@Body() createProductDto: CreateProductDto) {
    const newProduct = new this.productModel(createProductDto);
    return newProduct.save();
  }

  findAll() {
    return this.productModel.find().exec();
  }

  findOne(@Param('id') id: string) {
    return this.productModel.findById(id).exec();
  }

  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productModel
      .findByIdAndUpdate(id, updateProductDto, { new: true })
      .exec();
  }

  remove(@Param('id') id: string) {
    return this.productModel.findByIdAndDelete(id).exec();
  }
}
