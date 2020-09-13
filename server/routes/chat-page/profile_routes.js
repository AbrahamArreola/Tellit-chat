const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

const User = require('../../models/users');

/* app.put('/user/profile-image/upload/:id', function (req, res) {

    let userID = req.params.id;

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'No files were uploaded'
            }
        });
    }

    const file = req.files.file;
    const fileNameArray = file.name.split('.');
    const extension = fileNameArray[fileNameArray.length - 1].toLowerCase();

    const validExtensions = ["jpg", "jpeg", "png"];

    if (validExtensions.indexOf(extension) < 0) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'Invalid file. Allowed extensions: ' + validExtensions.join(', '),
                extension
            }
        });
    }

    const fileName = `user-image-profile-${userID}`;
}); */

app.get('/user/profile-image/:img', function (req, res) {

    let imgPath;

    if (fs.existsSync(imgPath)) {
        res.sendFile(imgPath);
    } else {
        let noImagePath = path.resolve(__dirname, '../../assets/images/default_user.png');
        res.sendFile(noImagePath);
    }
});

app.get('/user/get-profile/:id', async function (req, res) {

    const userID = req.params.id;

    try {
        const user = await User.findById(userID);

        res.json({
            ok: true,
            user
        });
    } catch (err) {
        if (!err.errors) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: `User with id:${userID} does not exist`
                }
            });
        }

        return res.status(400).json({
            ok: false,
            err
        });
    }
});

app.put('/user/update/:id', async function (req, res) {

    const userID = req.params.id;

    let body = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(userID, body, {
            new: true,
            runValidators: true,
            context: 'query',
            useFindAndModify: false
        });

        res.json({
            ok: true,
            updatedUser
        });
    } catch (err) {
        if (!err.errors) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: `User with id:${userID} does not exist`
                }
            });
        }

        return res.status(400).json({
            ok: false,
            err
        });
    }
});

module.exports = app;