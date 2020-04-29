import "dotenv/config"

export const keycloakConfig: any = {
  realm: process.env.REALM,
  "auth-server-url": process.env.AUTH_SERVER_URL,
  "ssl-required": "external",
  resource: process.env.CLIENT,
  "confidential-port": 0,
  "enable-cors": true,
  "realmPublicKey": process.env.PUBLIC_KEY
  //"cors-origins": 'http://vat*'
}
