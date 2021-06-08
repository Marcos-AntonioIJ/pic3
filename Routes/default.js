const express = require("express");
const router = express.Router();
const LoginEnterprise = require("../models/loginenterprise");
const LoginEmployees = require("../models/loginemployee");
const CadasterEnterprise = require("../models/cadasterenterprises");
const CadasterEmployee = require("../models/cadasteremployees");
const fs = require("fs");






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


router.get('/employee-edit/:id',function(req,res){
    CadasterEmployee.findOne({id:req.params.id,where:{id : req.params.id}}).then((results) =>{
        res.render('employee-edit',{results:results});   
    }
    ).catch((err) =>{
    console.log(err);
    });
});

router.get('/employees-find',function(req,res){
 
    CadasterEmployee.findAll({raw:true,where:{cnpj : sessioncnpj}}).then((results)=>{
    
        var base = Buffer.from(results[0].identidade);
        var conversion = base.toString('base64');
        results[0].identidade = conversion;
        res.render('employees-find',{results : results});

      
          
    }).catch(function(err){
        req.flash('msg_error',err);
        res.render('employees',{cnpj:sessioncnpj});
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
        comprovanteresidencia: req.body.Comprovanteresidencia,
        Avatar: req.body.Avatar
    }).then(function(){
        console.log("Created");
        res.redirect("/employees-find");
    }).catch(function(err){
        console.log(err);
        res.redirect("/employees-find");  
    })
})

router.post('/editemployee', function(req,res){

    var updateValues = {cnpj : req.body.Cnpj,
        employeename : req.body.Username,
        employeepassword : req.body.Password,
        cnpj: req.body.cnpj,
        cpf : req.body.Cpf,
        ctps : req.body.Ctps,
        email : req.body.Email,
        sexo : req.body.Sexo,
        setor : req.body.Setor,
        endereco : req.body.Endereco,
        idade : req.body.Idade,
        telefone : req.body.Telefone,
        estatus : req.body.Estatus,
        alario : req.body.Salario,
        banco : req.body.Banco,
        agencia : req.body.Agencia,
        nconta : req.body.Nconta,
        fotoeleitor : req.body.Fotoeleitor,
        reservista : req.body.Reservista,
        identidade : req.body.Identidade,
        fotoctps : req.body.Fotoctps,
        comprovanteresidencia : req.body.Comprovanteresidencia,
        Avatar : req.body.Avatar};

    var selector = {
        where : {id : req.body.id }
    }
    CadasterEmployee.update(updateValues,selector).then((results) => {
        res.redirect("/employees-find");  
    }).catch((err)=>{
        console.log(err);
        req.flash("error_msg","Erro na tentativa de alteração");
        res.redirect("/employees-find");  
});
});

router.post('/employeedelete',(req,res) => {
    CadasterEmployee.destroy({id: req.body.id,where:{id: req.body.id}}).then(()=>{
        console.log("deletado com sucesso");
        res.redirect("/employees-find");
    }).catch((err)=>{
        console.log("erro ao tentar deletar",err);
    })
})

router.post('/search',(req,res) =>{
    console.log(req.body.searchParam);
    if(req.body.searchParam == 'Nome'){

        CadasterEmployee.findAll({raw:true,where:{employeename : req.body.search, cnpj : sessioncnpj}}).then((results)=>{
               
          res.render('employees-find',{results : results});         
              
        }).catch(function(err){
            req.flash('msg_error',err);
            res.render('home',{cnpj:sessioncnpj});
        })
    }
    else if(req.body.searchParam == 'CPF'){
        CadasterEmployee.findAll({raw:true,where:{cnpj : sessioncnpj, cpf: req.body.search}}).then((results)=>{
    
            res.render('employees-find',{results : results});
              
        }).catch(function(err){
            req.flash('msg_error',err);
            res.render('home',{cnpj:sessioncnpj});
        })
    }
    else if(req.body.searchParam == 'Setor'){
        CadasterEmployee.findAll({raw:true,where:{cnpj : sessioncnpj, setor: req.body.search}}).then((results)=>{
    
            res.render('employees-find',{results : results});
              
        }).catch(function(err){
            req.flash('msg_error',err);
            res.render('home',{cnpj:sessioncnpj});
        })
    }
    else if(req.body.searchParam == 'Cargo'){
        CadasterEmployee.findAll({raw:true,where:{cnpj : sessioncnpj, estatus: req.body.search}}).then((results)=>{
    
            res.render('employees-find',{results : results});
              
        }).catch(function(err){
            req.flash('msg_error',err);
            res.render('home',{cnpj:sessioncnpj});
        })
    }
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