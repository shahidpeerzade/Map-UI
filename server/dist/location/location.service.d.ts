import { Model } from 'mongoose';
import { CoordinateDocument } from './schemas/coordinate.schema';
import { RouteDataDocument } from './schemas/routeData.schema';
import { SocketGateway } from './location.gateway';
export declare class LocationService {
    private coordinateModel;
    private routeDataModel;
    private readonly locationGateway;
    constructor(coordinateModel: Model<CoordinateDocument>, routeDataModel: Model<RouteDataDocument>, locationGateway: SocketGateway);
    storeCoordinates(coordinates: {
        userID: string;
        lat: number;
        lng: number;
    }): Promise<void>;
    storeRouteData(data: {
        origin: string;
        destination: string;
        userID: string;
    }): Promise<void>;
    verifyUserID(userID: string): Promise<boolean>;
    private convertToLatLng;
    getRouteData(userID: string): Promise<any>;
}
