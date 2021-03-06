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

let productsList = []; 
const bodyParser =  require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : true}))
const { productModel } = require("./Models/productModel.js")
const { userModel } = require("./Models/userModel.js")
const cors = require('cors')
const mongoose = require("mongoose");
const passwordHash = require('password-hash');

app.use(cors())

app.use(express.json());


// -------- Get single user by E-mail-----------
app.post('/connexion', function(req, res){
    const email = req.body.email;
    userModel.findOne({email: email}).then(unSeulUser =>{
        if (unSeulUser === null || unSeulUser == undefined ){
            res.send("Email incorrect ou inexistant.");
        }
        else if (passwordHash.verify(req.body.password, unSeulUser.password)) {
            res.json(unSeulUser)
        } else { res.send("Password incorrect ou inexistant.")}
    })
});

// --------------- adduser ----------
app.post('/models/users/addusers', (req, res) => {
    req.body.password = passwordHash.generate(req.body.password);
    var user = new userModel(req.body);
    user.save().then( () => { res.send("new user added")});
});

// --------------- DeleteUser
app.delete('/models/users/:_id', async (req, res) => {
    const id = req.params._id
    const user = await userModel.find({_id:id});
    await userModel.deleteOne({_id:id});
    res.status(200).json('User deleted:' + user)
});

//-------- updateUser-----------
app.put('/models/users/:_id', async (req, res) => {
    if (req.body._id) {
        res.status(405).send('Couldn\`t modify user id ')
    }
    const id = req.params._id
    req.body.password = passwordHash.generate(req.body.password);
    const user = await userModel.updateOne({_id:id}, {
        $set: req.body
    });
    res.status(200).send('user updated')
});




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
        productsList = resultat; 
    })
}); 

// -------- Get single product by id-----------
app.get('/products/:id', function(req, res){
    const id = req.params._id;
    productModel.findOne({id: id}).then(unSeulProduit =>{
        res.json(unSeulProduit)
    })
}); 



// -------- Filtrer la liste des produits récupérée dans le get -----------
io.on('connection', (socket ) => {
    socket.on('disconnect', () =>{
        console.log('user disconnected');
    })
    socket.on('filtername_change', (data)=> {
        let filtredProducts = [];
        if(productsList != undefined && productsList != []){
            if(data != ''){
                filtredProducts = productsList.filter(function (el) {
                        return el.nom?.includes(data)

                    }
                )
            }
            else{
                filtredProducts = productsList;
            }
            
            console.log(filtredProducts)
            socket.emit('filtered_name', filtredProducts)
        }
    })
});


server.listen( 3000, function() {
    console.log('Server starting')
})