import { Model } from 'mongoose';
import { CoordinateDocument } from './schemas/coordinate.schema';
import { LocationGateway } from './location.gateway';
export declare class LocationService {
    private coordinateModel;
    private readonly locationGateway;
    constructor(coordinateModel: Model<CoordinateDocument>, locationGateway: LocationGateway);
    storeCoordinates(coordinates: {
        userID: string;
        lat: number;
        lng: number;
    }): Promise<void>;
}
