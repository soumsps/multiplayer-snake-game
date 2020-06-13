const http = require('http');
const WebSocket = require('websocket').server;
const LIST = require('./src/consts/game-consts');

let connection = null;
const players = {};
const games = {};
let food = {};

const httpServer = http.createServer((req, res) => {
    console.log('HTTP request');
})

const ws = new WebSocket({ "httpServer": httpServer });

const createGame = (res) => {
    const playerID = res.playerID;
    const gameDate = new Date();
    const gameID = `${gameDate.getTime()}-s${gameDate.getFullYear()}n${gameDate.getMonth()}-a${gameDate.getDate()}`;
    games[gameID] = {
        'id': gameID,
        'players': []
    }
    food = { x: 3, y: 4 };
    const payLoad = {
        'method': LIST.CREATED,
        'game': games[gameID]
    }

    const con = players[playerID].connection;

    con.send(JSON.stringify(payLoad));
}

const joinGame = (res) => {
    const playerID = res.playerID;
    const gameID = res.gameID;
    const game = games[gameID];
    if (game.players.length > 3) {
        return;
    }
    const color = `hsla(${Math.random() * 360}, 100%, 70%, 1)`;
    game.players.push({
        'playerID': playerID,
        'color': color
    })

    const payLoad = {
        'method': LIST.JOINED,
        'game': game,
        'food': food
    }

    for (let item of game.players) {
        players[item.playerID].connection.send(JSON.stringify(payLoad));
    }
}

const connect = () => {
    const date = new Date();
    const playerID = `${date.getTime()}-s${date.getFullYear()}n${date.getMonth()}-a${date.getDate()}`;
    players[playerID] = {
        'connection': connection
    }

    const payLoad = {
        'method': LIST.CONNECT,
        'playerID': playerID
    }

    connection.send(JSON.stringify(payLoad));
}

ws.on('request', (req) => {
    connection = req.accept(null, req.origin);
    connection.on('open', () => {
        console.log('Connection opened!')
    })
    connection.on('close', () => {
        console.log('Connection closed!')
    })
    connection.on("message", (message) => {
        const res = JSON.parse(message.utf8Data);
        if (res.method === LIST.CREATE) {
            createGame(res);
        } else if (res.method === LIST.JOIN) {
            joinGame(res);
        }
    })
    connect();
})

httpServer.listen(8080, () => {
    console.log('listening on 8080')
})