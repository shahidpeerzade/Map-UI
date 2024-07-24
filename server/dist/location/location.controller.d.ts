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
}
