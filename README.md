#### Descriptions

_This service create users and assigns roles through rest endpoints._

#### Endpoints

##### POST /user/create

_create a user_

##### GET /user/read

_read all users_

##### GET /user/read/:email

_read a given user_

##### DELETE /user/delete/:email

_delete a given user_

## Getting Started

This repository depends on Keycloak for operation. To start a local container running Keycloak there are a few scripts to help you. You will need to install docker locally to run these.

### Creating the Keycloak container

To create the Keycloak container and get it running, use
`npm run keycloak:create`

You will want to wait to see the container id output to the terminal.

### Logging in to the Keycloak container

View scripts/create-keycloak for port, user and password information. Once logged in, you will want to create a realm so that this package can create users and roles.

### Stopping the Keycloak container

`npm run keycloak:kill`

### Restarting the Keycloak container

`npm run keycloak:start`
