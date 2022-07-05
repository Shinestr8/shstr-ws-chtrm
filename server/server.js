const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();

const server = http.createServer(app);

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {

    ws.on('message', (message) => {
        wss.clients.forEach(function each(client){
            client.send(JSON.stringify(JSON.parse(message).dataToSend))
        })
    });

    //send immediatly a feedback to the incoming connection    
    // ws.send({"user": "server", "message": "Welcome to the chat room"});
});

//start our server
server.listen(process.env.PORT || 8000, () => {
    console.log(`Server started on port ${server.address().port}`);
});