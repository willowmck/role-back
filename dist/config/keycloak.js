"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
exports.keycloakConfig = {
    realm: process.env.REALM,
    "auth-server-url": process.env.AUTH_SERVER_URL,
    "ssl-required": "external",
    resource: process.env.CLIENT,
    "confidential-port": 0,
    "enable-cors": true,
};
//# sourceMappingURL=keycloak.js.map