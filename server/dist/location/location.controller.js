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
exports.LocationController = void 0;
const common_1 = require("@nestjs/common");
const location_service_1 = require("./location.service");
let LocationController = class LocationController {
    constructor(locationService) {
        this.locationService = locationService;
    }
    async handleCoordinates(body, res) {
        console.log(body.userID, body.lat, body.lng);
        await this.locationService.storeCoordinates(body);
        return res.status(200).json({
            success: true,
            message: 'Data inserted successfully',
        });
    }
    async handleRoute(body, res) {
        await this.locationService.storeRouteData(body);
        return res.status(200).json({
            success: true,
            message: 'Route data inserted successfully',
        });
    }
    async verifyUserID(body, res) {
        const isValid = await this.locationService.verifyUserID(body.userID);
        if (isValid) {
            return res.status(200).json({
                success: true,
                message: 'User ID verified successfully',
            });
        }
        else {
            return res.status(400).json({
                success: false,
                message: 'Invalid User ID',
            });
        }
    }
    async getRouteData(userID, res) {
        try {
            console.log(`Received request for route data with userID: ${userID}`);
            const routeData = await this.locationService.getRouteData(userID);
            if (routeData) {
                return res.status(200).json({
                    success: true,
                    message: 'User ID verified successfully',
                    data: routeData,
                });
            }
            else {
                console.error('No route data found for the given user ID');
                return res.status(404).json({
                    success: false,
                    message: 'No route data found for the given user ID',
                });
            }
        }
        catch (error) {
            console.error('Error fetching route data:', error);
            return res.status(500).json({
                success: false,
                message: 'Internal server error',
            });
        }
    }
};
exports.LocationController = LocationController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], LocationController.prototype, "handleCoordinates", null);
__decorate([
    (0, common_1.Post)('route'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], LocationController.prototype, "handleRoute", null);
__decorate([
    (0, common_1.Post)('verify'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], LocationController.prototype, "verifyUserID", null);
__decorate([
    (0, common_1.Get)('route/:userID'),
    __param(0, (0, common_1.Param)('userID')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], LocationController.prototype, "getRouteData", null);
exports.LocationController = LocationController = __decorate([
    (0, common_1.Controller)('coordinates'),
    __metadata("design:paramtypes", [location_service_1.LocationService])
], LocationController);
//# sourceMappingURL=location.controller.js.map