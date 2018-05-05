const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let userSchema = new Schema({
    username: String,
    password: String,
    email: String
});

module.exports = userSchema;