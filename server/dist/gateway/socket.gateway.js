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
            { lat: -37.755584, lng: 145.343280 },
            { lat: -37.755228, lng: 145.343292 },
            { lat: -37.754783, lng: 145.343393 },
            { lat: -37.754347, lng: 145.343483 },
            { lat: -37.753884, lng: 145.343595 },
            { lat: -37.753519, lng: 145.343674 },
            { lat: -37.753193, lng: 145.343748 },
            { lat: -37.752752, lng: 145.343813 },
            { lat: -37.752422, lng: 145.343862 },
            { lat: -37.751995, lng: 145.343936 },
            { lat: -37.751625, lng: 145.344074 },
            { lat: -37.751403, lng: 145.344119 },
            { lat: -37.751048, lng: 145.344157 },
            { lat: -37.750747, lng: 145.344218 },
            { lat: -37.750579, lng: 145.344096 },
            { lat: -37.750531, lng: 145.343716 },
            { lat: -37.750483, lng: 145.343328 },
            { lat: -37.750441, lng: 145.342864 },
            { lat: -37.750321, lng: 145.341906 },
            { lat: -37.750248, lng: 145.341427 },
            { lat: -37.750194, lng: 145.340903 },
            { lat: -37.750086, lng: 145.340020 },
            { lat: -37.750032, lng: 145.339427 },
            { lat: -37.749972, lng: 145.338918 },
            { lat: -37.749948, lng: 145.338796 },
            { lat: -37.749864, lng: 145.338097 },
            { lat: -37.749834, lng: 145.337709 },
            { lat: -37.749731, lng: 145.337298 },
            { lat: -37.749701, lng: 145.336956 },
            { lat: -37.749677, lng: 145.336675 },
            { lat: -37.749581, lng: 145.336576 },
            { lat: -37.749250, lng: 145.336682 },
            { lat: -37.748817, lng: 145.336743 },
            { lat: -37.748558, lng: 145.336801 },
            { lat: -37.748097, lng: 145.336888 },
            { lat: -37.747764, lng: 145.336902 },
            { lat: -37.747530, lng: 145.336969 },
            { lat: -37.747091, lng: 145.337049 },
            { lat: -37.746802, lng: 145.337000 },
            { lat: -37.746238, lng: 145.336872 },
            { lat: -37.745945, lng: 145.336831 },
            { lat: -37.745804, lng: 145.336762 },
            { lat: -37.745674, lng: 145.336645 },
            { lat: -37.745585, lng: 145.336523 },
            { lat: -37.745503, lng: 145.336385 },
            { lat: -37.745448, lng: 145.336255 },
            { lat: -37.745393, lng: 145.335572 },
            { lat: -37.745363, lng: 145.335364 },
            { lat: -37.745321, lng: 145.334980 },
            { lat: -37.745305, lng: 145.334778 },
            { lat: -37.745282, lng: 145.334538 },
            { lat: -37.745252, lng: 145.334292 },
            { lat: -37.745212, lng: 145.333899 },
            { lat: -37.745189, lng: 145.333662 },
            { lat: -37.745157, lng: 145.333380 },
            { lat: -37.745143, lng: 145.333181 },
            { lat: -37.745117, lng: 145.332806 },
            { lat: -37.745080, lng: 145.332595 },
            { lat: -37.745076, lng: 145.332495 },
            { lat: -37.745050, lng: 145.332234 },
            { lat: -37.745036, lng: 145.332094 },
            { lat: -37.744988, lng: 145.331727 },
            { lat: -37.744967, lng: 145.331531 },
            { lat: -37.744941, lng: 145.331206 },
            { lat: -37.744932, lng: 145.331012 },
            { lat: -37.744886, lng: 145.330614 },
            { lat: -37.744844, lng: 145.330262 },
            { lat: -37.744830, lng: 145.330001 },
            { lat: -37.744784, lng: 145.329556 },
            { lat: -37.744761, lng: 145.329207 },
            { lat: -37.744719, lng: 145.328847 },
            { lat: -37.744670, lng: 145.328422 },
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