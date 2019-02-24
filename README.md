# Bookweb Notification

## Description
Project for Message Queue Worker, Kafka, Email and Sms notifications

## Development
Steps to run this project:

1. Run `npm i` command
2. Setup database settings inside `ormconfig.json` file
3. Run `npm start` command

## Deployment

1. Run `npm i` command
2. `sudo pm2 start --name bookweb_notification npm -- run start:prod`

## Migration

### Generate migration changes
1. `npm run typeorm -- migration:generate - n <ChangeName>`

### Apply migration changes
1. `npm run typeorm -- migration:run`

