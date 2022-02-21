import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
@Schema()
export class PizzaSchemas extends Document {
  @Prop({ required: true })
  pizzaName: string;
  @Prop({ required: true })
  price: number;
}

export const pizzaSchema = SchemaFactory.createForClass(PizzaSchemas);
