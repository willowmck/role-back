"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_1 = require("../index");
class User {
    async create(req, res) {
        const { realm, username, email } = req.body;
        if (realm && username && email) {
            index_1.kcAdminClient.setConfig({
                realmName: realm
            });
            await index_1.kcAdminClient.users.create({ realm, username, email });
            res.status(201).send(`Created: Successful creation of user ${email}.`);
        }
        else {
            res.status(406).send(`Not Acceptable: create endpoint requires realm, username, and email in the body of the request.`);
        }
    }
    async readMany(req, res) {
        res.status(200).send(await index_1.kcAdminClient.users.find());
    }
    async readOne(req, res) {
        const { email, realm } = req.params;
        if (realm && email) {
            res.send(200).send(await index_1.kcAdminClient.users.find({ realm, username: email }));
        }
    }
}
exports.User = User;
exports.userRoute = ({ create, readOne, readMany }) => {
    return express_1.Router()
        .post('/create', create)
        .get('/get', readMany)
        .post('/update/:email', readOne);
};
//# sourceMappingURL=users.js.map