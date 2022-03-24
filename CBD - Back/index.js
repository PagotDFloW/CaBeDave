const express = require("express");
const http = require("http")
const app = express();
const server = http.createServer(app)
const { Server } = require('socket.io')
const  io = new Server( server, {
    cors: {
        origin: '*',
    }
} )

let productsList; 
const bodyParser =  require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : true}))
const { productModel } = require("./Models/productModel.js")
const cors = require('cors')
const mongoose = require("mongoose");

app.use(cors())

app.use(express.json());

// -------- addProduct-----------
app.post('/models/products', (req, res) => {
    const product = new productModel(req.body);
    product.save().then( () => { res.send("new object added")});
});

//-------- DeleteProduct-----------
app.delete('/models/products/:ref', async (req, res) => {
    const reference = req.params.ref
    const p = await productModel.find({ref:reference});
    await productModel.deleteOne({ref:reference});
    res.status(200).json('Product deleted:' + p)
});

//-------- updateProduct-----------
app.put('/models/products/:ref', async (req, res) => {
    if (req.body.ref || req.body.id) {
       res.status(405).send('Couldn\`t modify product id or ref ') 
    }
    const reference = req.params.ref
    const p = await productModel.updateOne({ref:reference}, { 
        $set: req.body
    });
    res.status(200).send('Product updated')
});

// -------- Marketplace - returns all products-----------
app.get('/marketplace', function(req, res){
    productModel.find().then(resultat => {
        res.send(resultat)
        console.log(resultat)
        productsList = resultat; 
    })
}); 

// -------- Get single product by id-----------
app.get('/products/:id', function(req, res){
    const id = req.params.id;
    productModel.findOne({_id: id}).then(unSeulProduit =>{
        res.json(unSeulProduit)
        console.log(unSeulProduit)
    })
}); 

// -------- Filtrer la liste des produits récupérée dans le get -----------
io.on('connection', (socket ) => {
    console.log('a user connected');
    socket.on('disconnect', () =>{
        console.log('user disconnected');
    })
    socket.on('filtername_change', (data)=> {
        const filtredProducts = productsList.filter(el => 
            el.nom.includes(data)
        )
        console.log(filtredProducts)
        socket.emit('filtered_name', filtredProducts)

    })
}); 


server.listen( 3000, function() {
    console.log('Server starting')
})