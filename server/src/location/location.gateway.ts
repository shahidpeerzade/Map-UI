// import { WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
// import { Server, Socket } from 'socket.io';

// @WebSocketGateway({
//   cors: {
//     origin: '*',
//   },
// })
// export class LocationGateway implements OnGatewayConnection, OnGatewayDisconnect {
//   @WebSocketServer() server: Server;

//   handleConnection(client: Socket) {
//     console.log(`Client connected: ${client.id}`);
//   }

//   handleDisconnect(client: Socket) {
//     console.log(`Client disconnected: ${client.id}`);
//   }

//   emitCoordinates(data: { userID: string; lat: number; lng: number }) {
//     console.log('Emitting coordinates:', data);
//     this.server.emit('coordinates', data);
//   }
// }



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
  }
}
