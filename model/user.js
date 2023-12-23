const mongoose = require('mongoose');

const userData = new mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    number : String,
    message: String
});

const User = mongoose.model('User', userData);

module.exports = User;