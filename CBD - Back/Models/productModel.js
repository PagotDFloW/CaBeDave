const mongoose = require("../dataBase.js");

// create an schema
const productSchema = new mongoose.Schema({
    ref:String,
    name:String,
    description:String,
    categories: String,
    price:Number,
    attributs: String,
});

const productModel = mongoose.model('products', productSchema);

module.exports = { productModel }