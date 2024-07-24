import { Model } from 'mongoose';
import { CoordinateDocument } from './schemas/coordinate.schema';
import { SocketGateway } from './location.gateway';
export declare class LocationService {
    private coordinateModel;
    private readonly locationGateway;
    constructor(coordinateModel: Model<CoordinateDocument>, locationGateway: SocketGateway);
    storeCoordinates(coordinates: {
        userID: string;
        lat: number;
        lng: number;
    }): Promise<void>;
}
