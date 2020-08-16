const express = require('express');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

const User = require('../../models/users');

const app = express();

const signJsonWebToken = (user) => {
    return jwt.sign({
        user
    }, process.env.SEED, {
        expiresIn: process.env.TOKEN_EXPIRATION
    });
}

app.post('/register-user', async function(req, res){
    
    let body = req.body;

    let user = new User({
        name: body.name,
        username: body.username,
        email: body.email
    });
    
    try{
        user.password = bcrypt.hashSync(body.password, 10);

        const newUser = await user.save();

        res.json({
            ok: true,
            newUser,
            token: signJsonWebToken(user)
        });

    } catch(err){
        console.log(err);
        res.status(500).json({
            ok: false,
            err
        });
    }
});

app.post('/login-user', async function(req, res){

    let body = req.body;

    try{
        const user = await User.findOne({email: body.email});

        if(!user){
            return res.status(400).json({
                ok: false,
                field: "email",
                message: `There is no registered account with email ${body.email}`
            });
        }

        if(!bcrypt.compareSync(body.password, user.password)){
            return res.status(400).json({
                ok: false,
                field: "password",
                message: "Incorrect password"
            });
        }

        res.json({
            ok: true,
            user,
            token: signJsonWebToken(user)
        });

    } catch(err){
        console.log(err);
        res.status(500).json({
            ok: false,
            err
        });
    }
});

module.exports = app;