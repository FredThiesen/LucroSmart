import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Product } from 'src/products/products.schema';
import { Sale } from 'src/sales/sales.schema';
import { User } from 'src/users/users.schema';

export type BusinessDocument = HydratedDocument<Business>;

@Schema()
export class Business {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  profilePicture: string;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  })
  members: User[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }] })
  products: Product[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Sale' }] })
  sales: Sale[];
}

export const BusinessSchema = SchemaFactory.createForClass(Business);
