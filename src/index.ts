import 'dotenv/config';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import KcAdminClient from 'keycloak-admin';
import { keycloakConfig } from './config/keycloak';
import * as rateLimit from 'express-rate-limit';
import { userRoute, User } from './routes/users';
// import * as Keycloak from "keycloak-connect"
// import * as session from "express-session"
// import { Issuer } from 'openid-client';
import * as jwt from 'jsonwebtoken';
// const memoryStore = new session.MemoryStore()
// const keycloak = new Keycloak({ store: memoryStore, scope: "offline_access" }, keycloakConfig)

export const kcAdminClient = new KcAdminClient(keycloakConfig);

export const start = async () =>
  await kcAdminClient.auth({
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    grantType: 'password',
    clientId: 'admin-cli',
    clientSecret: 'envvar',
  });

const app: any = express();

app.use(
  rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 100, // 100 requests per 5 minute window
  })
);
app.use(
  bodyParser.urlencoded({
    limit: '50kb',
  })
);

app.use('/users', bodyParser(), userRoute(new User()));

app.listen(process.env.PORT, async () => {
  try {
    await start();
    kcAdminClient.setConfig({
      realmName: 'whitelist',
    });
    console.log(kcAdminClient.accessToken);
    console.log(jwt.decode(kcAdminClient.accessToken));
    // let { exp } = jwt.decode(kcAdminClient.accessToken)
    let accessToken = kcAdminClient.accessToken;
    let decode = jwt.decode(accessToken, 'envvar');
    decode.exp += 20000;

    kcAdminClient.setAccessToken(jwt.sign(decode, 'envvar'));

    console.log(kcAdminClient.accessToken);

    // decode and resign the access token
    // console.log("\n\n\n" + JSON.stringify(jwt.decode(kcAdminClient.accessToken, undefined, 2)))

    // setInterval(async (): Promise<any> => {
    //   try {
    //     kcAdminClient.setAccessToken(kcAdminClient.getAccessToken())
    //   }
    //   catch (e) {
    //     console.error(e.message)
    //   }

    // }, 58000)
  } catch (e) {
    console.error(e.message);
  }
});
