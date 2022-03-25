const mongoose = require("../dataBase.js");
const user = require("./userModel");


// create an schema
const panierSchema = new mongoose.Schema({
    id_produit:String,
    id_user:String
});

const panierModel = mongoose.model('panier', panierSchema);

module.exports = { panierModel }