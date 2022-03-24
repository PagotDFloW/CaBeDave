const productSchema = require('./product-schema');

const express = require('express')
const bodyParser =  require('body-parser');
const { default: mongoose } = require('mongoose');
var app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : true}))


mongoose.connect('mongodb://localhost:27017/cbd');
app.get('/marketplace', function(req, res) {
    const products = mongoose.model('products', productSchema);
    products.find().then(resultat => {
        res.send(resultat); 
        // req.json(req.body);
        console.log(resultat); 
    })
});

// app.post('/marketplace/product', (req, res) => {
//     product = mongoose.model('Product', productSchema)
//     const {reference, nom, categorie, description, prix, attribut} = req.body;
//     product.insertOne({
//         reference:  'hujghrgregr', // String is shorthand for {type: String}
//         nom: 'regregrgr',
//         categories:   ['Strrgregregrgring', 'jzhgryfgeygfye'],
//         description: 'regyretertgre', 
//         prix: 3, 
//         attributs: ['rererrrrrrr', 'ihrughrughhrgrgrgr'],
//     })
// })


// const Product = mongoose.model('Product', productSchema);


app.listen(3000, function() {
    console.log('Server starting')
})