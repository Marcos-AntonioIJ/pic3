const express = require("express");
const router = express.Router();
const LoginEnterprise = require("../models/loginenterprise");
const LoginEmployees = require("../models/loginemployee");
const CadasterEnterprise = require("../models/cadasterenterprises");
const CadasterEmployee = require("../models/cadasteremployees");



router.get('/',(req,res)=>
{
    res.render('signin');
})

router.get('/signin',(req,res)=>{
    res.render('signin');
})

router.get('/signup',(req,res)=>{
    res.render('signup');
})

router.get('/home',(req,res)=>{
    res.render('home');
})

router.get('/logout',(req,res)=>{
    res.render('signin');

})

router.get('/employees-cadaster',function(req,res){
    res.render('employees',{cnpj : sessioncnpj});
})

router.post('/cadasterenterprise',function(req,res){
    CadasterEnterprise.create({
        cnpj: req.body.Cnpj,
        name: req.body.Username,
        password: req.body.Password
    }).then(function(){
        console.log("Created");
    }).catch(function(){
        console.log('Error');
    })
})

router.get('/employee-find',function(req,res){
    const options = {
        where: { cnpj: sessioncnpj },
    };
    CadasterEmployee.findAll({raw:true,where:{cnpj : sessioncnpj}}).then((results)=>{
        res.render('employees-find',{results:results});
        console.log(results);
    }).catch(function(err){
        req.flash('msg_error','falha na busca');
    })
})

router.post('/cadasteremployee',function(req,res){
    CadasterEmployee.create({

        cnpj: req.body.Cnpj,
        employeename: req.body.Username,
        employeepassword: req.body.Password,
        cpf : req.body.Cpf,
        ctps: req.body.Ctps,
        email: req.body.Email,
        sexo: req.body.Sexo,
        setor: req.body.Setor,
        endereco: req.body.Endereco,
        idade: req.body.Idade,
        telefone: req.body.Telefone,
        estatus: req.body.Estatus,
        salario: req.body.Salario,
        banco: req.body.Banco,
        agencia: req.body.Agencia,
        nconta: req.body.Nconta,
        fotoeleitor: req.body.Fotoeleitor,
        reservista: req.body.Reservista,
        identidade: req.body.Identidade,
        fotoctps: req.body.Fotoctps,
        comprovanteresidencia: req.body.Comprovanteresidencia

    }).then(function(){
        console.log("Created");
    }).catch(function(err){
        console.log(err);
    })
})

router.post('/login',function(req,res){
     CadasterEnterprise.findByPk(req.body.Cnpj).then((result) => {
        if(req.body.Cnpj == result.cnpj && req.body.Password == result.password){
            console.log("Usuário Autenticado");
            global.sessioncnpj = result.cnpj;
            res.render('home',{result:result});
        }else{
            console.log("Conta não existente");
        }
     }).catch((err) => {
         req.flash("error_msg", 'Houve um erro ao logar!');
     })

})

module.exports = router;