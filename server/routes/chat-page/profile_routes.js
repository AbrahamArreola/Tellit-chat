const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

app.get('/user/profile-image/:img', function(req, res){

    let imgPath;

    console.log("enter here");

    if(fs.existsSync(imgPath)){
        res.sendFile(imgPath);
    }
    else{
        let noImagePath = path.resolve(__dirname, '../../assets/images/default_user.png');
        res.sendFile(noImagePath);
    }
});

module.exports = app;