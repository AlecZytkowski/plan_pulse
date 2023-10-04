const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    //Should this be true?
    token: {type: String, required: false}
});

const User = mongoose.model('User', userSchema)

module.exports = User;