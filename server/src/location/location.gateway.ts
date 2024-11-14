import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: '*',
  allowEIO3: true,
  path: '/ws/',
  transports: ['polling', 'websocket'],
})
export class SocketGateway {
  @WebSocketServer() server: Server;

  emitCoordinates(data: { userID: string; lat: number; lng: number }) {
    this.server.emit('coordinates', data);
    console.log(`emitted data ${data.userID}`)
  }

  emitRouteData(data: { userID: string; origin: { lat: number; lng: number }; destination: { lat: number; lng: number } }) {
    this.server.emit('routeData', data);
  }
}