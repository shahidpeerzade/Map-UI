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
      { lat: 12.916708, lng: 77.610137 },
      { lat: 12.916660, lng: 77.607668 },
      {lat: 12.916825, lng: 77.602357},
      {lat: 12.916848, lng: 77.599837},
      {lat: 12.918298, lng: 77.599894},
      {lat: 12.919801, lng: 77.599951},
      {lat: 12.921840, lng: 77.600090},
      {lat: 12.924011, lng: 77.600193},
      {lat: 12.926762, lng: 77.600349},
      {lat: 12.930063, lng: 77.600468},
      {lat: 12.932266, lng: 77.600539},
      {lat: 12.935227, lng: 77.601280},
      {lat: 12.936948, lng: 77.601563}
    ];
    client.emit('coordinates', coordinates);
  }
}
