import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Business } from 'src/business/business.schema';
import { Supply } from 'src/supplies/supplies.schema';

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  total: number;

  @Prop({
    type: { type: mongoose.Schema.Types.ObjectId, ref: 'Business' },
    required: true,
  })
  business: Business;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Supply' }] })
  supplies: Supply[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
