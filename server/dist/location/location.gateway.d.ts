import { Server } from 'socket.io';
export declare class SocketGateway {
    server: Server;
    emitCoordinates(data: {
        userID: string;
        lat: number;
        lng: number;
    }): void;
}
