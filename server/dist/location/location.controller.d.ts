import { LocationService } from './location.service';
import { Response } from 'express';
export declare class LocationController {
    private readonly locationService;
    constructor(locationService: LocationService);
    handleCoordinates(body: {
        userID: string;
        lat: number;
        lng: number;
    }, res: Response): Promise<Response<any, Record<string, any>>>;
    handleRoute(body: {
        origin: string;
        destination: string;
        userID: string;
    }, res: Response): Promise<Response<any, Record<string, any>>>;
    verifyUserID(body: {
        userID: string;
    }, res: Response): Promise<Response<any, Record<string, any>>>;
    getRouteData(userID: string, res: Response): Promise<Response<any, Record<string, any>>>;
}
