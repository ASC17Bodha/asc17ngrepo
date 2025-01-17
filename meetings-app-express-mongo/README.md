# meetings-app-express-mongo
Backend for the Meetings App created in Node.js + MongoDB

## What tools are needed to run this?
- [Node.js](https://nodejs.org/en/) - The latest LTS version is recommended.
- [mongoimport](https://www.mongodb.com/try/download/database-tools) - This is part of the DB tools for MongoDB.
Additionally, if you run the DB locally you must have [MongoDB Community Server](https://www.mongodb.com/try/download/community) installed and ```mongod``` started.

## Launching the server
- Set up NODE_ENV (development | production) as an environment variable
- Set up the .env file in the project folder with the following keys
    - NODE_ENV (development | production)
    - DB_HOST
    - DB_USER
    - DB_PASSWORD
Make sure the file is called ```.env``` (you can maintain separate files for different environment, but the one that is picked up on application start is ```.env```).
- Add additional environment variables separately in your cloud environment. For example,
    - PORT (where server listens on)
    - JWT_SECRET_KEY (used by the server to generate authentication tokens)
- To launch the server, run the following from the project folder
```
npm start
```
Before starting u the serverp, the app will connect to the MongoDB server and import the seed data (found in data/ folder).

## Seed data
The DB is dropped and seeded with fresh data every time the server starts up. The data can be set using the JSON files in data/ folder. If you want to skip loading the data afresh when the server start up, you can start the server this way instead
```
npm start -- --skip-seed
```

## API documentation
The API documentation can be found at http://ipaddress:port/api. Substitute ipaddress and port according to your where you run this app on. A [Postman](https://www.postman.com/downloads/) collection for the APIs can be found in docs/postman_collection.json. Install Postman (if you do not already have it), and import the collection.