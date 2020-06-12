const http = require('http');
const WebSocket = require('websocket').server;
let connection = null;


const httpServer = http.createServer((req, res) => {
    console.log('HTTP request');
})

const ws = new WebSocket({ "httpServer": httpServer });

ws.on('request', (req) => {
    connection = req.accept(null, req.origin);
    connection.on('open', (e) => {
        console.log('Opened!')
    })
    connection.on('close', (e) => {
        console.log('Closed!')
    })
    connection.on("message", (e) => {
        console.log('Received message', e.utf8Data);
        connection.send('check from server');

    })

    connection.send('check from server');
})

httpServer.listen(8080, () => {
    console.log('listening on 8080')
})