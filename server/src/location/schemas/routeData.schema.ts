import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class RouteData extends Document {
  @Prop({ required: true, type: Object })
  origin: { lat: number; lng: number };

  @Prop({ required: true, type: Object })
  destination: { lat: number; lng: number };

  @Prop({ required: true })
  userID: string;
}

export type RouteDataDocument = RouteData & Document;
export const RouteDataSchema = SchemaFactory.createForClass(RouteData);