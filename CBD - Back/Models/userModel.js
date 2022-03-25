const mongoose = require("../dataBase.js");
const productSchema = require("./productModel.js");

// create an schema
const userSchema = new mongoose.Schema({
    _id: Schema.Types.ObjectId,
    name: String,
    lastname: String,
    username: String,
    email: String,
    password: String,
    role: String,
    panier: [{ type: Schema.Types.ObjectId, ref: productSchema }]
});

const userModel = mongoose.model('user', userSchema);

module.exports = { userModel }