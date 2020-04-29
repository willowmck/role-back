import { Router } from 'express'
import { kcAdminClient } from '../index'

export class User {
  async create(req: any, res: any): Promise<any> {
    const { realm, username, email } = req.body;
    try {
      if (realm && username && email) {
        await kcAdminClient.users.create({ realm: realm, username: username, email: email })
        res.status(201).send(`Created: Successful creation of user ${email}.`);
      } else {
        res.status(406).send(`Not Acceptable: create endpoint requires realm, username, and email in the body of the request.`)
      }
    } catch (e) {
      res.status(400).send(e.message)
    }
  }

  async readMany(req: any, res: any): Promise<any> {
    try {
      res.status(200).send(await kcAdminClient.users.find())
    }
    catch (e) {
      res.status(400).send(e.message)
    }
  }

  async readOne(req: any, res: any): Promise<any> {
    const { username, realm } = req.params;
    try {
      if (realm && username) {
        res.status(200).send(await kcAdminClient.users.find({ realm, username }))
      }
    }
    catch (e) {
      res.status(400).send(e.message)
    }

  }
}

export const userRoute = ({ create, readOne, readMany }) => {
  return Router()
    .post('/create', create)
    .get('/get', readMany)
    .get('/get/:realm/:username', readOne)
}