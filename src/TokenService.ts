// import * as Keycloak from "keycloak-connect"

// export class TokenService {

//   static auth: any = {};

//   constructor() { }

//   static init(): Promise<any> {
//     // const keycloakAuth: Keycloak.KeycloakInstance = Keycloak({
//     //   url: cpr,
//     //   realm: config.keycloak.realm,
//     //   clientId: config.keycloak.clientId
//     // });
//     return new Promise((resolve, reject) => {
//       keycloakAuth.init({ onLoad: 'check-sso', flow: 'implicit', checkLoginIframe: false }).success(() => {
//         TokenService.auth.authz = keycloakAuth;
//         resolve();
//       }).error(() => {
//         reject();
//       });
//     });
//   }

//   getToken(): Promise<string> {
//     return new Promise<string>((resolve, reject) => {
//       if (TokenService.auth.authz.isTokenExpired()) {
//         console.warn("Token expired !");
//         TokenService.auth.authz.updateToken(1800).success(() => {
//           console.log("Token updated");
//           resolve(<string>TokenService.auth.authz.token);
//         }).error(() => {
//           reject('Failed to refresh token');
//         });
//       } else {
//         resolve(<string>TokenService.auth.authz.token);
//       }
//     });
//   }
// }