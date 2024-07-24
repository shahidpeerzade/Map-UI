import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LocationService } from './location.service';
import { LocationController } from './location.controller';
import { LocationGateway } from './location.gateway';
import { Coordinate, CoordinateSchema } from './schemas/coordinate.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Coordinate.name, schema: CoordinateSchema }]),
  ],
  controllers: [LocationController],
  providers: [LocationService, LocationGateway],
  exports: [LocationService],
})
export class LocationModule {}
