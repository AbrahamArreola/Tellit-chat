const express = require('express');

const app = express();

app.use(require('./access/access_routes'));


module.exports = app;