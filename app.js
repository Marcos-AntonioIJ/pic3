const express = require('express');
const app = express();
server = require('http').createServer(app),
server.listen(3000);
app.use(express.urlencoded({extended:true}));
const defaultRoutes = require('./Routes/default');
const database = require('./models/database');
app.use('/',defaultRoutes);
const handlebars = require('express-handlebars');
app.use(express.static('public'));

app.engine("handlebars",handlebars({defaultLayout: 'main'}));
app.set("view engine","handlebars");




app.listen(8089,(req,res)=>{
    console.log("amaterasu");
});