import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Coordinate, CoordinateDocument } from './schemas/coordinate.schema';
import { LocationGateway } from './location.gateway';

@Injectable()
export class LocationService {
  constructor(
    @InjectModel(Coordinate.name) private coordinateModel: Model<CoordinateDocument>,
    private readonly locationGateway: LocationGateway,
  ) {}

  async storeCoordinates(coordinates: { userID: string; lat: number; lng: number }) {
    // Store coordinates in MongoDB
    const newCoordinate = new this.coordinateModel(coordinates);
    await newCoordinate.save();

    // Emit coordinates to clients via WebSocket
    this.locationGateway.emitCoordinates({
      userID: coordinates.userID,
      lat: coordinates.lat,
      lng: coordinates.lng,
    });
  }
}
