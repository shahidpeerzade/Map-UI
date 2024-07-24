import { Body, Controller, Post, Res } from '@nestjs/common';
import { LocationService } from './location.service';
import { Response } from 'express';

@Controller('coordinates')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Post()
  async handleCoordinates(@Body() body: { userID: string; lat: number; lng: number }, @Res() res: Response) {
    await this.locationService.storeCoordinates(body);
    return res.status(200).json({ 
      success: true,
      message: 'Data inserted successfully' });
  }
}
