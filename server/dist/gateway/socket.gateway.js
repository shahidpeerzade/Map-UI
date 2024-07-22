"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
let SocketGateway = class SocketGateway {
    afterInit(server) {
        console.log('Init');
    }
    handleConnection(client, ...args) {
        console.log(`Client connected: ${client.id}`);
        this.sendCoordinates(client);
    }
    handleDisconnect(client) {
        console.log(`Client disconnected: ${client.id}`);
    }
    sendCoordinates(client) {
        const coordinates = [
            { lat: 12.916708, lng: 77.610137 },
            { lat: 12.916660, lng: 77.607668 },
            { lat: 12.916825, lng: 77.602357 },
            { lat: 12.916848, lng: 77.599837 },
            { lat: 12.918298, lng: 77.599894 },
            { lat: 12.919801, lng: 77.599951 },
            { lat: 12.921840, lng: 77.600090 },
            { lat: 12.924011, lng: 77.600193 },
            { lat: 12.926762, lng: 77.600349 },
            { lat: 12.930063, lng: 77.600468 },
            { lat: 12.932266, lng: 77.600539 },
            { lat: 12.935227, lng: 77.601280 },
            { lat: 12.936948, lng: 77.601563 }
        ];
        client.emit('coordinates', coordinates);
    }
};
exports.SocketGateway = SocketGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], SocketGateway.prototype, "server", void 0);
exports.SocketGateway = SocketGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: "*"
        }
    })
], SocketGateway);
//# sourceMappingURL=socket.gateway.js.map