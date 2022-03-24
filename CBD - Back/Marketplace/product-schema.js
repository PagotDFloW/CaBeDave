const mongoose = require('mongoose');
const { Schema } = mongoose;

module.exports = new Schema({
  reference:  String, // String is shorthand for {type: String}
  nom: String,
  categorie:   String,
  description: String, 
  prix: Number, 
  attribut: String, 

});