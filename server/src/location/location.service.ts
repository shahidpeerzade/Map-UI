import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Coordinate, CoordinateDocument } from './schemas/coordinate.schema';
import { SocketGateway } from './location.gateway';

@Injectable()
export class LocationService {
  constructor(
    @InjectModel(Coordinate.name)
    private coordinateModel: Model<CoordinateDocument>,
    private readonly locationGateway: SocketGateway,
  ) {}

  async storeCoordinates(coordinates: { lat: number; lng: number }) {
    coordinates['userID'] = '1';
    // Store coordinates in MongoDB
    const newCoordinate = new this.coordinateModel(coordinates);
    await newCoordinate.save();

    // Emit coordinates to clients via WebSocket
    this.locationGateway.emitCoordinates({
      userID: '1',
      lat: coordinates.lat,
      lng: coordinates.lng,
    });
  }
}
