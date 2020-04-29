"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express = require("express");
const bodyParser = require("body-parser");
const keycloak_admin_1 = require("keycloak-admin");
const keycloak_1 = require("../config/keycloak");
const Keycloak = require("keycloak-connect");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const users_1 = require("./routes/users");
exports.kcAdminClient = new keycloak_admin_1.default(keycloak_1.keycloakConfig);
exports.start = async () => await exports.kcAdminClient.auth({
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    grantType: "password",
    clientId: "admin-cli"
});
const memoryStore = new session.MemoryStore();
const keycloak = new Keycloak({ store: memoryStore }, keycloak_1.keycloakConfig);
const app = express();
app.use(bodyParser());
app.use(cookieParser());
app.get('/', async (req, res) => {
    try {
        await exports.start();
        exports.kcAdminClient.setConfig({
            realmName: 'whitelist',
        });
        let users = await exports.kcAdminClient.users.find();
        await exports.kcAdminClient.users.create({
            realm: 'whitelist',
            username: 'johnsmith',
            email: 'john@smith.com'
        });
        res.send(JSON.stringify(users, undefined, 2));
    }
    catch (e) {
        console.log(`${e.message}`);
        res.send(e.message);
    }
});
app.use('/users', users_1.userRoute(new users_1.User()));
app.listen(process.env.PORT, async () => {
    await exports.start();
    exports.kcAdminClient.setConfig({
        realmName: 'whitelist',
    });
});
//# sourceMappingURL=index.js.map