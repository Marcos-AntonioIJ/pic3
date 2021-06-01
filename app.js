const express = require('express');
const app = express();
const port = process.env.PORT || 3030;
const session = require("express-session");
const flash = require("connect-flash");
const path = require("path");


app.use(session({
    secret: 'abcd',
    resave : true,
    saveUninitialized : true
}))

app.use(flash())

app.use((req,res,next) => {
    res.locals.sucess_msg = req.flash("sucess_msg");
    res.locals.error_msg = req.flash("error_msg");
    next()
})

app.use(express.urlencoded({extended:true}));
const defaultRoutes = require('./Routes/default');
app.use('/',defaultRoutes);
const handlebars = require('express-handlebars');
app.use(express.static(path.join(__dirname,"public")));
app.engine("handlebars",handlebars({defaultLayout: 'main'}));
app.set("view engine","handlebars");




app.listen(port,(req,res)=>{
    console.log("amaterasu");
});