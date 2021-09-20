# data-gobbler
Data Globber is responsible for handeling read , write and update from the client side and commnicate with the file-processor service to read and write files.

### Prerequisite :
For DB and MQ, I've added a docker-compose file.
  - Postgress DB
  - RbbitMQ
  - Protoc (if want to add new messages)
  - Nodejs 14+
  - Typescript compiler (TSC)

### How to start the service :
- Feed the .env variable and start all the above mentioned services.
-  clone this repo and `cd file-processor`
- `npm install`
- `npm run start:dev`
- The service will be running in http://127.0.0.1:3000 and the corresponding swagger doc is in http://127.0.0.1:3000/api


### Tests :
To run test `npm run test`
