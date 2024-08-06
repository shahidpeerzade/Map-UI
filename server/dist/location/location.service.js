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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const axios_1 = require("axios");
const coordinate_schema_1 = require("./schemas/coordinate.schema");
const routeData_schema_1 = require("./schemas/routeData.schema");
const location_gateway_1 = require("./location.gateway");
let LocationService = class LocationService {
    constructor(coordinateModel, routeDataModel, locationGateway) {
        this.coordinateModel = coordinateModel;
        this.routeDataModel = routeDataModel;
        this.locationGateway = locationGateway;
    }
    async storeCoordinates(coordinates) {
        const newCoordinate = new this.coordinateModel(coordinates);
        await newCoordinate.save();
        this.locationGateway.emitCoordinates({
            userID: coordinates.userID,
            lat: coordinates.lat,
            lng: coordinates.lng,
        });
    }
    async storeRouteData(data) {
        const origin = await this.convertToLatLng(data.origin);
        const destination = await this.convertToLatLng(data.destination);
        const newRouteData = new this.routeDataModel({
            origin,
            destination,
            userID: data.userID,
        });
        await newRouteData.save();
        this.locationGateway.emitRouteData({
            userID: data.userID,
            origin,
            destination,
        });
    }
    async verifyUserID(userID) {
        const routeData = await this.routeDataModel.findOne({ userID }).exec();
        return !!routeData;
    }
    async convertToLatLng(address) {
        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;
        const response = await axios_1.default.get(url);
        if (response.data && response.data.length > 0) {
            const { lat, lon: lng } = response.data[0];
            return { lat: parseFloat(lat), lng: parseFloat(lng) };
        }
        else {
            throw new Error(`Geocoding error: Unable to find coordinates for address "${address}"`);
        }
    }
    async getRouteData(userID) {
        return this.routeDataModel.findOne({ userID }).exec();
    }
};
exports.LocationService = LocationService;
exports.LocationService = LocationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(coordinate_schema_1.Coordinate.name)),
    __param(1, (0, mongoose_1.InjectModel)(routeData_schema_1.RouteData.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        location_gateway_1.SocketGateway])
], LocationService);
//# sourceMappingURL=location.service.js.map