import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Coordinate extends Document {
  @Prop({ required: true })
  userID: string;

  @Prop({ required: true })
  lat: number;

  @Prop({ required: true })
  lng: number;
}

export type CoordinateDocument = Coordinate & Document;
export const CoordinateSchema = SchemaFactory.createForClass(Coordinate);
