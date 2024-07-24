import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LocationModule } from './location/location.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/coordinates'),
    LocationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
