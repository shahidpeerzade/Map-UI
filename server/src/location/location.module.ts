import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LocationService } from './location.service';
import { LocationController } from './location.controller';
import { SocketGateway } from './location.gateway';
import { Coordinate, CoordinateSchema } from './schemas/coordinate.schema';
// import { LocationGateway } from './location.gateway';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Coordinate.name, schema: CoordinateSchema },
    ]),
  ],
  controllers: [LocationController],
  providers: [LocationService, SocketGateway],
  exports: [LocationService],
})
export class LocationModule {}
