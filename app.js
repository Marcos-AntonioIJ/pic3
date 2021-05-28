const express = require('express');
const app = express();
const port = process.env.PORT || 3030;
app.use(express.urlencoded({extended:true}));

const defaultRoutes = require('./Routes/default');
app.use('/',defaultRoutes);

const handlebars = require('express-handlebars');
app.use(express.static('public'));
app.engine("handlebars",handlebars({defaultLayout: 'main'}));
app.set("view engine","handlebars");




app.listen(port,(req,res)=>{
    console.log("amaterasu");
});