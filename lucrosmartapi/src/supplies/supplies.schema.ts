import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

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

  @Prop()
  userId: string;
}

export const SupplySchema = SchemaFactory.createForClass(Supply);
