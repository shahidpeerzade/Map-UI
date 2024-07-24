import { Document } from 'mongoose';
export declare class Coordinate extends Document {
    userID: string;
    lat: number;
    lng: number;
}
export type CoordinateDocument = Coordinate & Document;
export declare const CoordinateSchema: import("mongoose").Schema<Coordinate, import("mongoose").Model<Coordinate, any, any, any, Document<unknown, any, Coordinate> & Coordinate & Required<{
    _id: unknown;
}>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Coordinate, Document<unknown, {}, import("mongoose").FlatRecord<Coordinate>> & import("mongoose").FlatRecord<Coordinate> & Required<{
    _id: unknown;
}>>;
