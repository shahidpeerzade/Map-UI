import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LocationService } from './location.service';
import { LocationController } from './location.controller';
import { SocketGateway } from './location.gateway';
import { Coordinate, CoordinateSchema } from './schemas/coordinate.schema';
import { RouteData, RouteDataSchema } from './schemas/routeData.schema'; // Import the new schema

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Coordinate.name, schema: CoordinateSchema },
      { name: RouteData.name, schema: RouteDataSchema },
    ]),
  ],
  controllers: [LocationController],
  providers: [LocationService, SocketGateway],
  exports: [LocationService],
})
export class LocationModule {}
