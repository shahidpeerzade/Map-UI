import { Server } from 'socket.io';
export declare class SocketGateway {
    server: Server;
    emitCoordinates(data: {
        userID: string;
        lat: number;
        lng: number;
    }): void;
    emitRouteData(data: {
        userID: string;
        origin: {
            lat: number;
            lng: number;
        };
        destination: {
            lat: number;
            lng: number;
        };
    }): void;
}
