const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const path = require('path');
const { env } = require('process');

let Schema = mongoose.Schema;

let userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name required']
    },
    username: {
        type: String,
        required: [true, 'Username required']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Email required']
    },
    password: {
        type: String,
        required: [true, 'Password required']
    },
    image: {
        type: String,
        default: 'http://localhost:9000/user/profile-image/default-image'
    },
    statusComment: {
        type: String,
        default: "I'm using tell it chat!"
    },
    status: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

userSchema.methods.toJSON = function(){

    let userObject = this.toObject();
    delete userObject.password;

    return userObject
}

userSchema.plugin(uniqueValidator, {message: '{PATH} must be unique'});

module.exports = mongoose.model('User', userSchema);