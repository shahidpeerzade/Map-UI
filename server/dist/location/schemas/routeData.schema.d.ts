import { Document } from 'mongoose';
export declare class RouteData extends Document {
    origin: {
        lat: number;
        lng: number;
    };
    destination: {
        lat: number;
        lng: number;
    };
    userID: string;
}
export type RouteDataDocument = RouteData & Document;
export declare const RouteDataSchema: import("mongoose").Schema<RouteData, import("mongoose").Model<RouteData, any, any, any, Document<unknown, any, RouteData> & RouteData & Required<{
    _id: unknown;
}>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, RouteData, Document<unknown, {}, import("mongoose").FlatRecord<RouteData>> & import("mongoose").FlatRecord<RouteData> & Required<{
    _id: unknown;
}>>;
