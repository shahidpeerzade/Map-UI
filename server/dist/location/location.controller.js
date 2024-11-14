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
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    async handleCoordinates(body, res) {
        const dummyData = [
            { "userID": "yvje1vnxt6", "lat": 16.826760, "lng": 75.738087 },
            { "userID": "yvje1vnxt6", "lat": 16.826746, "lng": 75.737910 },
            { "userID": "yvje1vnxt6", "lat": 16.826737, "lng": 75.737741 },
            { "userID": "yvje1vnxt6", "lat": 16.826723, "lng": 75.737573 },
            { "userID": "yvje1vnxt6", "lat": 16.826653, "lng": 75.737503 },
            { "userID": "yvje1vnxt6", "lat": 16.826554, "lng": 75.737514 },
            { "userID": "yvje1vnxt6", "lat": 16.826473, "lng": 75.737512 },
            { "userID": "yvje1vnxt6", "lat": 16.826415, "lng": 75.737510 },
            { "userID": "yvje1vnxt6", "lat": 16.826308, "lng": 75.737514 },
            { "userID": "yvje1vnxt6", "lat": 16.826200, "lng": 75.737524 },
            { "userID": "yvje1vnxt6", "lat": 16.826100, "lng": 75.737535 },
            { "userID": "yvje1vnxt6", "lat": 16.826017, "lng": 75.737547 },
            { "userID": "yvje1vnxt6", "lat": 16.825868, "lng": 75.737562 },
            { "userID": "yvje1vnxt6", "lat": 16.825725, "lng": 75.737611 },
            { "userID": "yvje1vnxt6", "lat": 16.825579, "lng": 75.737660 },
            { "userID": "yvje1vnxt6", "lat": 16.825430, "lng": 75.737713 },
            { "userID": "yvje1vnxt6", "lat": 16.825322, "lng": 75.737745 },
            { "userID": "yvje1vnxt6", "lat": 16.825250, "lng": 75.737772 },
            { "userID": "yvje1vnxt6", "lat": 16.825109, "lng": 75.737809 },
            { "userID": "yvje1vnxt6", "lat": 16.824969, "lng": 75.737848 },
            { "userID": "yvje1vnxt6", "lat": 16.824787, "lng": 75.737902 },
            { "userID": "yvje1vnxt6", "lat": 16.824729, "lng": 75.737920 },
            { "userID": "yvje1vnxt6", "lat": 16.824600, "lng": 75.737962 },
            { "userID": "yvje1vnxt6", "lat": 16.824497, "lng": 75.737995 },
            { "userID": "yvje1vnxt6", "lat": 16.824450, "lng": 75.738011 },
            { "userID": "yvje1vnxt6", "lat": 16.824414, "lng": 75.737997 },
            { "userID": "yvje1vnxt6", "lat": 16.824401, "lng": 75.737949 },
            { "userID": "yvje1vnxt6", "lat": 16.824360, "lng": 75.737810 },
            { "userID": "yvje1vnxt6", "lat": 16.824332, "lng": 75.737716 },
            { "userID": "yvje1vnxt6", "lat": 16.824303, "lng": 75.737631 },
            { "userID": "yvje1vnxt6", "lat": 16.824265, "lng": 75.737495 },
            { "userID": "yvje1vnxt6", "lat": 16.824235, "lng": 75.737406 },
            { "userID": "yvje1vnxt6", "lat": 16.824210, "lng": 75.737317 },
            { "userID": "yvje1vnxt6", "lat": 16.824167, "lng": 75.737178 },
            { "userID": "yvje1vnxt6", "lat": 16.824149, "lng": 75.737093 },
            { "userID": "yvje1vnxt6", "lat": 16.824116, "lng": 75.737004 },
            { "userID": "yvje1vnxt6", "lat": 16.824077, "lng": 75.736865 },
            { "userID": "yvje1vnxt6", "lat": 16.824033, "lng": 75.736682 },
            { "userID": "yvje1vnxt6", "lat": 16.823984, "lng": 75.736511 },
            { "userID": "yvje1vnxt6", "lat": 16.823938, "lng": 75.736376 },
            { "userID": "yvje1vnxt6", "lat": 16.823877, "lng": 75.736174 },
            { "userID": "yvje1vnxt6", "lat": 16.823848, "lng": 75.736062 },
            { "userID": "yvje1vnxt6", "lat": 16.823785, "lng": 75.735862 },
            { "userID": "yvje1vnxt6", "lat": 16.823744, "lng": 75.735709 },
            { "userID": "yvje1vnxt6", "lat": 16.823700, "lng": 75.735570 },
            { "userID": "yvje1vnxt6", "lat": 16.823662, "lng": 75.735458 },
            { "userID": "yvje1vnxt6", "lat": 16.823626, "lng": 75.735340 },
            { "userID": "yvje1vnxt6", "lat": 16.823598, "lng": 75.735220 },
            { "userID": "yvje1vnxt6", "lat": 16.823569, "lng": 75.735099 },
            { "userID": "yvje1vnxt6", "lat": 16.823542, "lng": 75.734974 },
            { "userID": "yvje1vnxt6", "lat": 16.823485, "lng": 75.734808 },
            { "userID": "yvje1vnxt6", "lat": 16.823390, "lng": 75.734502 },
            { "userID": "yvje1vnxt6", "lat": 16.823321, "lng": 75.734286 },
            { "userID": "yvje1vnxt6", "lat": 16.823267, "lng": 75.734107 },
            { "userID": "yvje1vnxt6", "lat": 16.823190, "lng": 75.733838 },
            { "userID": "yvje1vnxt6", "lat": 16.823115, "lng": 75.733537 },
            { "userID": "yvje1vnxt6", "lat": 16.823065, "lng": 75.733345 },
            { "userID": "yvje1vnxt6", "lat": 16.823015, "lng": 75.733118 },
            { "userID": "yvje1vnxt6", "lat": 16.822945, "lng": 75.732857 },
            { "userID": "yvje1vnxt6", "lat": 16.822897, "lng": 75.732658 },
            { "userID": "yvje1vnxt6", "lat": 16.822834, "lng": 75.732390 },
            { "userID": "yvje1vnxt6", "lat": 16.822790, "lng": 75.732204 },
            { "userID": "yvje1vnxt6", "lat": 16.822777, "lng": 75.732082 },
            { "userID": "yvje1vnxt6", "lat": 16.822754, "lng": 75.731907 },
            { "userID": "yvje1vnxt6", "lat": 16.822736, "lng": 75.731767 },
            { "userID": "yvje1vnxt6", "lat": 16.822716, "lng": 75.731575 },
            { "userID": "yvje1vnxt6", "lat": 16.822697, "lng": 75.731425 },
            { "userID": "yvje1vnxt6", "lat": 16.822677, "lng": 75.731195 },
            { "userID": "yvje1vnxt6", "lat": 16.822641, "lng": 75.730843 },
            { "userID": "yvje1vnxt6", "lat": 16.822648, "lng": 75.730062 },
            { "userID": "yvje1vnxt6", "lat": 16.822643, "lng": 75.729733 },
            { "userID": "yvje1vnxt6", "lat": 16.822649, "lng": 75.729613 },
            { "userID": "yvje1vnxt6", "lat": 16.822651, "lng": 75.729415 },
            { "userID": "yvje1vnxt6", "lat": 16.822642, "lng": 75.729195 },
            { "userID": "yvje1vnxt6", "lat": 16.822639, "lng": 75.729062 },
            { "userID": "yvje1vnxt6", "lat": 16.822635, "lng": 75.728875 },
            { "userID": "yvje1vnxt6", "lat": 16.822634, "lng": 75.728677 },
            { "userID": "yvje1vnxt6", "lat": 16.822631, "lng": 75.728584 },
            { "userID": "yvje1vnxt6", "lat": 16.822634, "lng": 75.728510 },
            { "userID": "yvje1vnxt6", "lat": 16.822645, "lng": 75.728396 }
        ];
        for (const data of dummyData) {
            await this.locationService.storeCoordinates(data);
            await this.sleep(1000);
        }
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
    (0, common_1.Post)('/'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], LocationController.prototype, "handleCoordinates", null);
__decorate([
    (0, common_1.Post)('/route'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], LocationController.prototype, "handleRoute", null);
__decorate([
    (0, common_1.Post)('/verify'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], LocationController.prototype, "verifyUserID", null);
__decorate([
    (0, common_1.Get)('/route/:userID'),
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