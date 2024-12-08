import { Body, Injectable, Param } from '@nestjs/common';
import { CreateBusinessDto } from './dto/create-business.dto';
import { UpdateBusinessDto } from './dto/update-business.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Business } from './business.schema';
import { Model } from 'mongoose';

@Injectable()
export class BusinessService {
  constructor(
    @InjectModel(Business.name) private readonly businessModel: Model<Business>,
  ) {}

  create(createBusinessDto: CreateBusinessDto) {
    const newBusiness = new this.businessModel(createBusinessDto);
    return newBusiness.save();
  }

  findAll() {
    return `This action returns all business from that user`;
  }

  findOne(@Param('id') id: string) {
    return this.businessModel.findById(id).exec();
  }

  update(
    @Param('id') id: string,
    @Body() updateBusinessDto: UpdateBusinessDto,
  ) {
    return this.businessModel
      .findByIdAndUpdate(id, updateBusinessDto, { new: true })
      .exec();
  }

  remove(@Param('id') id: string) {
    return this.businessModel.findByIdAndDelete(id).exec();
  }
}
