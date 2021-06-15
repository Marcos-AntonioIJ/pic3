const express = require('express');
const app = express();
const port = process.env.PORT || 3030;
const path = require("path");

global.__basedir = __dirname;


app.use(express.urlencoded({extended:true}));
const defaultRoutes = require('./Routes/default');
app.use('/',defaultRoutes);
const handlebars = require('express-handlebars');
const database = require('./models/database');
app.use(express.static(path.join(__dirname,"public")));
app.engine("handlebars",handlebars({defaultLayout: 'main'}));
app.set("view engine","handlebars");




app.listen(port,(req,res)=>{
    console.log("Servidor rodando");
});