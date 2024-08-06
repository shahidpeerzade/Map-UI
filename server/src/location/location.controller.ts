import { Body, Controller, Post, Res, Get, Param } from '@nestjs/common';
import { LocationService } from './location.service';
import { Response } from 'express';

@Controller('coordinates')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Post()
  async handleCoordinates(
    @Body() body: { userID: string; lat: number; lng: number },
    @Res() res: Response,
  ) {      
    console.log(body.userID, body.lat, body.lng)
    await this.locationService.storeCoordinates(body);
    return res.status(200).json({
      success: true,
      message: 'Data inserted successfully',
    });
  }

  @Post('route')
  async handleRoute(
    @Body() body: { origin: string; destination: string; userID: string },
    @Res() res: Response,
  ) {
      await this.locationService.storeRouteData(body);
      return res.status(200).json({
        success: true,
        message: 'Route data inserted successfully',
      });
  }

  @Post('verify')
  async verifyUserID(
    @Body() body: { userID: string },
    @Res() res: Response,
  ) {
    const isValid = await this.locationService.verifyUserID(body.userID);
    if (isValid) {
      return res.status(200).json({
        success: true,
        message: 'User ID verified successfully',
      });
    } else {
      return res.status(400).json({
        success: false,
        message: 'Invalid User ID',
      });
    }
  }

  @Get('route/:userID')
  async getRouteData(@Param('userID') userID: string, @Res() res: Response) {
    try {
      console.log(`Received request for route data with userID: ${userID}`);
      const routeData = await this.locationService.getRouteData(userID);
      if (routeData) {
        return res.status(200).json({
          success: true,
          message: 'User ID verified successfully',
          data: routeData,
        });
      } else {
        console.error('No route data found for the given user ID');
        return res.status(404).json({
          success: false,
          message: 'No route data found for the given user ID',
        });
      }
    } catch (error) {
      console.error('Error fetching route data:', error);
      return res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }
  

}