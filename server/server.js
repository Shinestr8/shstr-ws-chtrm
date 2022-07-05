const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');

// const { networkInterfaces } = require('os');

// const nets = networkInterfaces();
// const results = Object.create(null); // Or just '{}', an empty object

// for (const name of Object.keys(nets)) {
//     for (const net of nets[name]) {
//         // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
//         // 'IPv4' is in Node <= 17, from 18 it's a number 4 or 6
//         const familyV4Value = typeof net.family === 'string' ? 'IPv4' : 4
//         if (net.family === familyV4Value && !net.internal) {
//             if (!results[name]) {
//                 results[name] = [];
//             }
//             results[name].push(net.address);
//         }
//     }
// }



// console.log(results);


const app = express();

app.use(express.static(path.join(__dirname, 'build')))

//main route that serves front end from build folder
app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.get('/ip', function(req, res){
    const ifaces = require('os').networkInterfaces();
    let address;

    Object.keys(ifaces).forEach(dev => {
    ifaces[dev].filter(details => {
        if (details.family === 'IPv4' && details.internal === false) {
        address = details.address;
        }
    });
    
});
res.json(address);
// console.log(address);
})

const server = http.createServer(app);

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {

    ws.on('message', (message) => {
        wss.clients.forEach(function each(client){
            client.send(JSON.stringify(JSON.parse(message).dataToSend))
        })
    });
});


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
  })

server.listen(process.env.PORT || 8000, () => {
    console.log(`Server started on port ${server.address().port}`);
});