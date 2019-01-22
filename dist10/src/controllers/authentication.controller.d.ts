/// <reference types="express" />
import { Request } from '@loopback/rest';
export declare class AuthenticationController {
    private req;
    constructor(req: Request);
    nonce(): object;
}
