import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Product } from 'src/products/products.schema';

export type SupplyDocument = HydratedDocument<Supply>;

@Schema()
export class Supply {
  @Prop()
  name: string;

  @Prop()
  price: number;

  @Prop()
  unit: string;

  @Prop()
  description: string;

  @Prop({
    type: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    required: true,
  })
  product: Product;
}

export const SupplySchema = SchemaFactory.createForClass(Supply);
