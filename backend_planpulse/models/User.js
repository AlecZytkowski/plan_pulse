const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    userImageUrl: {type: String, required: false},
    password: {type: String, required: true},
    //Should this be true?
    token: {type: String, required: false}
});

const User = mongoose.model('User', userSchema)

module.exports = User;