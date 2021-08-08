# Fun List App

## Introduction

This repository contains all the required code for Fun List App:

- API endpoint to serve save/retrieve/update fun lists (movies & actors)
- Client which is a reactjs client for viewing and managing fun lists

## Pre-req for running it locally. Please note that i'm leaving my valid configurations for smoother evaluation experience. I will deactivate the resources secrets by the end of the week

- ### Setup mongoDB
  1. Set environment variable in /api/.env file with a valid mongodb connection string
  ```
  env:
      MONGO_CONNECTION_STRING: "Valid connection string"
  ```
- ### Setup firebase storage
  1. Set environment variable in /client/src/firebase.js file with a valid firebase SDK setup configuration
  ```
  configuration:
     const firebaseConfig = {
        apiKey: "AIzaSyBS-Xa4svlwKjYSGxLSrz70nxcztR928Mk",
        authDomain: "funlistapp.firebaseapp.com",
        projectId: "funlistapp",
        storageBucket: "funlistapp.appspot.com",
        messagingSenderId: "911858763716",
        appId: "1:911858763716:web:9c3d3799391f9e6a1e8691",
        };
  ```

## Running it locally:

## Firstly, Launching API Server (Backend)

- ### STEPS
  1. clone the project to your local
  2. go to FUNLIST/api/
  3. npm i
  4. npm start (You should see consoled messages "Backend server started!" & "DB is up")
  5. Backend server uri: http://localhost:3002/api
  6. Swagger UI is integerated (As example only one endpoint is added): http://localhost:3002/swagger
  7. You can refer to the PostMan collection at the ROOT folder if you want to test the api individually

## Finally, Launching Client (Frontend)

- ### STEPS
  1. Open new console terminal and go to FUNLIST/client/
  2. npm i
  3. npm start (Building might take long due to Cypress) I wanted to use Vite instead of webpack for faster bundling process but i ran out of time
  4. Have fun!

## Tech stacks:

1. Nodejs server with koa web framework
2. mongodb
3. firebase storage (For saving uploaded videos and movie posters)
4. reactjs with hooks

## Code coverage:

### I have added 1 integration test, 1 api test, 1 unit test and some UI test (Cypress):
