import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
@Schema()
export class CartSchemas extends Document {
  @Prop({ required: true })
  email: string;
  @Prop({ required: true })
  pizza: string;
  @Prop({ required: true })
  totalPrice: number;
}

export const cartSchemas = SchemaFactory.createForClass(CartSchemas);
