"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express = require("express");
const bodyParser = require("body-parser");
const keycloak_admin_1 = require("keycloak-admin");
const kcAdminClient = new keycloak_admin_1.default({
    baseUrl: 'http://localhost:8080/auth',
    realmName: 'whitelist'
});
let start = async () => await kcAdminClient.auth({
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    grantType: "password",
    clientId: process.env.CLIENT_ID
});
const app = express();
app.use(bodyParser());
app.get('/', async (req, res) => {
    try {
        await start();
    }
    catch (e) {
        console.log(`${e.message}`);
    }
    res.send("SUP");
});
app.listen(3333);
//# sourceMappingURL=index.js.map