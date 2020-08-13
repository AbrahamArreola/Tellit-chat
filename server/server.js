const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const http = require('http');
const socketIo = require("socket.io");

require('./config/config');

const app = express();
const server = http.createServer(app);

app.set('port', process.env.PORT);

app.use(require('./routes/index'));

const io = socketIo(server);

server.listen(app.get('port'), () => {
    console.log(`Server running on port: ${app.get('port')}`);
});