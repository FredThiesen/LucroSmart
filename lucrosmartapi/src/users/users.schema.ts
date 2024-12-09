import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Business } from 'src/business/business.schema';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  isActive: boolean;

  @Prop()
  role: string;

  @Prop()
  profilePicture: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Business' }] })
  businesses: Business[];
}

export const UserSchema = SchemaFactory.createForClass(User);
