const express = require('express');

require('./config/config');

const app = express();

app.set('port', process.env.PORT);

app.get('/', function(req, res){
    res.json({
        msg: "test"
    });
})

app.listen(app.get('port'), () => {
    console.log(`Server running on port: ${app.get('port')}`);
});