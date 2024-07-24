import { WebSocketGateway, WebSocketServer, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: "*"
  }
})
export class SocketGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  afterInit(server: Server) {
    console.log('Init');
  }

  handleConnection(client: Socket, ...args: any[]) {
    console.log(`Client connected: ${client.id}`);
    this.sendCoordinates(client);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  sendCoordinates(client: Socket) {
    const coordinates = [
      {lat: -37.755854, lng: 145.343223},
      {lat: -37.744622, lng: 145.327899},
      {lat: -37.744539, lng: 145.327138}
  ];
    client.emit('coordinates', coordinates);
  }
}
