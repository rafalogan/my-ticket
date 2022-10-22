# Athon API
***

## Requires

* [NodeJS](https://nodejs.org/en/docs/)
* [TypeScript](https://www.typescriptlang.org/docs/home.html)
* [Docker](https://www.docker.com/products/docker-hub)

## To run Developer environment

* Up database ```docker-composer up```
* Up Dev ```npm run dev```
* start dist ```npm start```

## Environment Variables

On Development environment need to create a file `.env` with then variables:
```.dotenv
# VARIABLES OF ENVIROMENT
# ENVIRONMENT
NODE_ENV=

# SERVER CONFIGS
PORT=
HOST=


# TIMEZONE
TIMEZONE=

# DATA BASE CONFIG CONNECTIONS RELATIONAL
DB_CLIENT=
DB_HOST=
DB_NAME=
DB_USER=
DB_PASSWORD=
DB_PORT=

# CORS CONFIGS
CORS_ORIGIN=
CORS_METHOD=
CORS_PREFLIGHTCONTIME=
CORS_OPTIONSSUCCESSSTATUS=

# CACHE CONFIGS
CACHE_ENABLE=
CACHE_TIME=
REDISHOST=
REDISPORT=

# AWS CONFIGS
STORAGE_TYPE=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_REGION=
AWS_BUCKET=

#HTTPS CONFIGS
ENABLE_HTTPS=
CERT_FILE=
KEY_FILE=

# SECURITY CONFIGS
SALT_ROUNDS=
AUTHSECRET=

#MAIL ENVIROMENT
MAILER_HOST=
MAILER_PORT=
MAILER_SERVICE=
MAILER_USER=
MAILER_PASSWORD=
EMAIL_DEFAULT=


```
## To use Https in Dev

To use ```https``` or ```ssl``` in the development environment is necessary to create a
directory ssl with the tree:

```tree
certs
├── cert.pem
└── key.pem
```

the directory must contain in root:
* ```server.csr``` file;
* ```server.key``` file;
* ```cert``` directory;
	* ```server.crt``` file;

To generate self-signed certificate is suitable for the development environment. To generate the certificate files and ``openssl`` must be installed on the computer.  
First generate a private key:
```shell
openssl genrsa -des3 -out server.key 1024
```
_this command need to type a private phrase_

Next step generate ``file.csr`` use this command

```shell
openssl req -new -key server.key -out old_server.csr
```
_Answer all questions this step will request your private phrase_

Last step generate ``file.crt`` use this command;

```shell
openssl x509 -req -days 365 -in old_server.csr -signkey server.key -out server.crt
```
_To generate this file it is necessary to have generated the two previous files_

to configure the application for https work's, fill in the following environment variables in the ``.env`` file
```dotenv
ENABLE_HTTPS=#Set value 'true' falue defaut is 'false'
CERT=#path for file.crt
KEY=#path for file.key
```
