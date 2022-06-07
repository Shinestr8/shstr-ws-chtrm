const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();

//initialize a simple http server
const server = http.createServer(app);

//initialize the WebSocket server instance
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {

    //connection is up, let's add a simple simple event
    ws.on('message', (message) => {
        const toSend = JSON.parse(message).message
        //log the received message and send it back to the client
        console.log('received: %s', message);
        console.log(JSON.parse(message).message)
        // ws.send(`Hello, you sent -> ${message}`);
        wss.clients.forEach(function each(client){
            // console.log(toSend)
            client.send(toSend)
        })
    });

    //send immediatly a feedback to the incoming connection    
    ws.send('Welcome to the chat room');
});

//start our server
server.listen(process.env.PORT || 8000, () => {
    console.log(`Server started on port ${server.address().port} hihihi :)`);
});

// const webSocketsServerPort = 8000;
// const webSocketServer = require('websocket').server;
// const http = require('http');
// // Spinning the http server and the websocket server.
// const server = http.createServer();
// server.listen(webSocketsServerPort);
// const wsServer = new webSocketServer({
//   httpServer: server
// });

// // I'm maintaining all active connections in this object
// const clients = {};

// // This code generates unique userid for everyuser.
// const getUniqueID = () => {
//   const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
//   return s4() + s4() + '-' + s4();
// };

// wsServer.on('request', function(request) {
//   var userID = getUniqueID();
//   console.log((new Date()) + ' Recieved a new connection from origin ' + request.origin + '.');
//   // You can rewrite this part of the code to accept only the requests from allowed origin
//   const connection = request.accept(null, request.origin);
//   clients[userID] = connection;
//   console.log('connected: ' + userID + ' in ' + Object.getOwnPropertyNames(clients))
// });

// wsServer.on('message', (data){
//     console.log(data);
// })