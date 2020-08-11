const express = require('express');

const app = express();

app.get('/login-user', function(req, res){
    res.json({
        user: 'test'
    });
});

module.exports = app;