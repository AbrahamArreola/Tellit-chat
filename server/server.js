const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

require('./config/config');

const app = express();

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());

app.set('port', process.env.PORT);

app.use(require('./routes/index'));

mongoose.set('useCreateIndex', true);

mongoose.connect(process.env.URL_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err, res) => {
    if (err) throw err;
    else console.log("Database connected");
});

app.listen(app.get('port'), () => {
    console.log(`Server running on port: ${app.get('port')}`);
});