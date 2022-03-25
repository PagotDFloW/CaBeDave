const mongoose = require("../dataBase.js");

// create an schema
const userSchema = new mongoose.Schema({
    name: String,
    lastname: String,
    username: String,
    email: String,
    password: String,
    role: String,
});

const userModel = mongoose.model('user', userSchema);

module.exports = { userModel }