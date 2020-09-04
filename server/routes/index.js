const express = require('express');

const app = express();

app.use(require('./access/access_routes'));
app.use(require('./chat-page/profile_routes'));


module.exports = app;