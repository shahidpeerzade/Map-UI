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
            { lat: -37.755854, lng: 145.343223 },
            { lat: -37.744622, lng: 145.327899 },
            { lat: -37.744539, lng: 145.327138 }
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