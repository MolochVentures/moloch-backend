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
const rest_1 = require("@loopback/rest");
const context_1 = require("@loopback/context");
/**
 * OpenAPI response for ping()
 */
const NONCE_RESPONSE = {
    description: 'Ping Response',
    content: {
        'application/json': {
            schema: {
                type: 'object',
                properties: {
                    greeting: { type: 'string' },
                    date: { type: 'string' },
                    url: { type: 'string' },
                    headers: {
                        type: 'object',
                        properties: {
                            'Content-Type': { type: 'string' },
                        },
                        additionalProperties: true,
                    },
                },
            },
        },
    },
};
let AuthenticationController = class AuthenticationController {
    constructor(req) {
        this.req = req;
    }
    // Map to `GET /nonce`
    nonce() {
        // Reply with a greeting, the current time, the url, and request headers
        return {
            greeting: 'Nonce',
            date: new Date(),
            url: this.req.url,
            headers: Object.assign({}, this.req.headers),
        };
    }
};
__decorate([
    rest_1.get('/nonce', {
        responses: {
            '200': NONCE_RESPONSE,
        },
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], AuthenticationController.prototype, "nonce", null);
AuthenticationController = __decorate([
    __param(0, context_1.inject(rest_1.RestBindings.Http.REQUEST)),
    __metadata("design:paramtypes", [Object])
], AuthenticationController);
exports.AuthenticationController = AuthenticationController;
//# sourceMappingURL=authentication.controller.js.map