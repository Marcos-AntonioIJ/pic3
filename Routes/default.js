const express = require("express");
const router = express.Router();
const Login = require("../models/login");
const Cadaster = require("../models/cadaster");

router.get('/',(req,res)=>
{
    res.render('cadaster');
})

router.get('/signin',(req,res)=>{
    res.render('signin');
})

router.post('/cadasterenterprise',function(req,res){
    Cadaster.create({
        cnpj: req.body.Cnpj,
        name: req.body.Username,
        password: req.body.Password
    }).then(function(){
        console.log("Created");
    }).catch(function(){
        console.log('Error');
    })
    console.log(Cadaster);
})

router.post('/login',function(req,res){
    Login.findOne({
        cnpj: req.body.Cnpj,
        password: req.body.Password
    }).then(function(){
        console.log("Dados enviados");
    }).catch(function(){
        console.log('Error');
    })
})

module.exports = router;