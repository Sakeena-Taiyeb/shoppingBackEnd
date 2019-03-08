//for accessing the dependencies
var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var cors = require('cors');
var expressValidator = require('express-validator');
// creating an instance of express
var app = express();
const route =require('./route/routes.js'); //here we have location to our route file

//connecting to Mongodb
mongoose.connect('mongodb://localhost:27017/shoppingItemSchema');
mongoose.connection.on('connected',()=>{
    console.log('Connected to Mongodb');
});
mongoose.connection.on('error',(err)=>{
    console.log(err);
});

const PORT =3000;

//adding middlewares
app.use(cors());

// parse application/json
app.use(bodyparser.json());
//  extending the standard Express request object with additional helper functions for validating post body, 
//query or parameter data
app.use(expressValidator());





//any route ending with api will be route to given location
app.use('/api',route);

//Testing a Route
app.get('/',(req,res)=>{
    res.send("Hello Everyone!..");
});
app.listen(PORT,()=>{
    console.log("server started at port:"+PORT);
});

