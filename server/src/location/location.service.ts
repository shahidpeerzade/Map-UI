import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import axios from 'axios';
import { Coordinate, CoordinateDocument } from './schemas/coordinate.schema';
import { RouteData, RouteDataDocument } from './schemas/routeData.schema';
import { SocketGateway } from './location.gateway';

@Injectable()
export class LocationService {
  constructor(
    @InjectModel(Coordinate.name)
    private coordinateModel: Model<CoordinateDocument>,
    @InjectModel(RouteData.name)
    private routeDataModel: Model<RouteDataDocument>,
    private readonly locationGateway: SocketGateway,
  ) {}

  async storeCoordinates(coordinates: { userID: string; lat: number; lng: number }) {
    const newCoordinate = new this.coordinateModel(coordinates);
    await newCoordinate.save();

    // Emit coordinates to clients via WebSocket
    this.locationGateway.emitCoordinates({
      userID: coordinates.userID,
      lat: coordinates.lat,
      lng: coordinates.lng,
    });
  }

  async storeRouteData(data: { origin: string; destination: string; userID: string }) {
    const origin = await this.convertToLatLng(data.origin);
    const destination = await this.convertToLatLng(data.destination);

    const newRouteData = new this.routeDataModel({
      origin,
      destination,
      userID: data.userID,
    });
    await newRouteData.save();

    // Emit route data to clients via WebSocket
    this.locationGateway.emitRouteData({
      userID: data.userID,
      origin,
      destination,
    });
  }

  async verifyUserID(userID: string): Promise<boolean> {
    const routeData = await this.routeDataModel.findOne({ userID }).exec();
    return Boolean(routeData);
  }  

  
  private async convertToLatLng(address: string): Promise<{ lat: number; lng: number }> {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;
    const response = await axios.get(url);
    
    if (response.data && response.data.length > 0) {
      const { lat, lon: lng } = response.data[0];
      return { lat: parseFloat(lat), lng: parseFloat(lng) };
    } else {
      throw new Error(`Geocoding error: Unable to find coordinates for address "${address}"`);
    }
  }
  
  async getRouteData(userID: string): Promise<any> {
    return this.routeDataModel.findOne({ userID }).exec();
  }
}