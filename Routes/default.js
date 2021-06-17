const express = require("express");
const router = express.Router();
const CadasterEnterprise = require("../models/cadasterenterprises");
const CadasterEmployee = require("../models/cadasteremployees");
const Multer = require("../middleware/multer");
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


router.get('/logout',(req,res)=>{
    res.render('signin');

})

router.get('/employees-cadaster',function(req,res){
    res.render('employees',{cnpj : sessioncnpj});
})

router.post('/cadasterenterprise',Multer.any('file'),function(req,res){
    CadasterEnterprise.create({
        cnpj: req.body.Cnpj,
        enterprisename: req.body.Username,
        enterprisepassword: req.body.Password,
        email: req.body.Email,
        setor: req.body.Setor,
        endereco: req.body.Endereco,
    }).then(function(){
        res.redirect("/signin");
    }).catch(function(err){
        console.log('Error',err);
    })
})


router.get('/employee-edit/:id',function(req,res){
    CadasterEmployee.findOne({id:req.params.id,where:{id : req.params.id}}).then((results) =>{
     
            results.Avatar  = results.Avatar.toString('base64');
            results.comprovanteresidencia = results.comprovanteresidencia.toString('base64')
            results.identidade = results.identidade.toString('base64')
            results.fotoctps = results.fotoctps.toString('base64')
            results.fotoeleitor = results.fotoeleitor.toString('base64')
            results.reservista = results.reservista.toString('base64')

            res.render('employee-edit',{results:results});   
    }
    ).catch((err) =>{
    console.log(err);
    });
});

router.get('/employees-find',function(req,res){
 
    CadasterEmployee.findAll({raw:true,where:{cnpj : sessioncnpj}}).then((results)=>{

       
            for(var i=0;i<=results.length-1;i++){
            var base = Buffer.from(results[i].Avatar);
            var conversion = base.toString('base64');
            results[i].Avatar = conversion;
            }

        res.render('employees-find',{results : results});
          
    }).catch(function(err){
        console.log(err);
        res.render('employees',{cnpj:sessioncnpj});
    })
})


router.post('/cadasteremployee',Multer.any("file"),function(req,res){
    if(req.files.length >= 1){
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
            fotoeleitor: fs.readFileSync(__basedir + "/public/Images/Uploads/Fotoeleitor.jpg"),
            reservista: fs.readFileSync(__basedir + "/public/Images/Uploads/Reservista.jpg"),
            identidade: fs.readFileSync(__basedir + "/public/Images/Uploads/Identidade.jpg"),
            fotoctps: fs.readFileSync(__basedir + "/public/Images/Uploads/Fotoctps.jpg"),
            comprovanteresidencia: fs.readFileSync(__basedir + "/public/Images/Uploads/Comprovanteresidencia.jpg"),
            Avatar: fs.readFileSync(__basedir + "/public/Images/Uploads/Avatar.jpg")
        }).then(function(){
            console.log("Created");
            fs.unlinkSync(__basedir + "/public/Images/Uploads/Fotoeleitor.jpg"),
            fs.unlinkSync(__basedir + "/public/Images/Uploads/Reservista.jpg"),
            fs.unlinkSync(__basedir + "/public/Images/Uploads/Identidade.jpg"),
            fs.unlinkSync(__basedir + "/public/Images/Uploads/Fotoctps.jpg"),
            fs.unlinkSync(__basedir + "/public/Images/Uploads/Comprovanteresidencia.jpg"),
            fs.unlinkSync(__basedir + "/public/Images/Uploads/Avatar.jpg")
            res.redirect("/employees-find");
        }).catch(function(err){
            console.log(err);
            res.redirect("/employees-find");  
        })
    
    }else{
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
            fotoeleitor: fs.readFileSync(__basedir + "/public/Images/Icons/semfoto.jpg"),
            reservista: fs.readFileSync(__basedir +  "/public/Images/Icons/semfoto.jpg"),
            identidade: fs.readFileSync(__basedir +  "/public/Images/Icons/semfoto.jpg"),
            fotoctps: fs.readFileSync(__basedir +  "/public/Images/Icons/semfoto.jpg"),
            comprovanteresidencia: fs.readFileSync(__basedir +  "/public/Images/Icons/semfoto.jpg"),
            Avatar: fs.readFileSync(__basedir +  "/public/Images/Icons/sem-foto.jpg")
        }).then(function(){
            console.log("Created");
            fs.unlinkSync(__basedir + "/public/Images/Uploads/Fotoeleitor.jpg"),
            fs.unlinkSync(__basedir + "/public/Images/Uploads/Reservista.jpg"),
            fs.unlinkSync(__basedir + "/public/Images/Uploads/Identidade.jpg"),
            fs.unlinkSync(__basedir + "/public/Images/Uploads/Fotoctps.jpg"),
            fs.unlinkSync(__basedir + "/public/Images/Uploads/Comprovanteresidencia.jpg"),
            fs.unlinkSync(__basedir + "/public/Images/Uploads/Avatar.jpg")

            res.redirect("/employees-find");
        }).catch(function(err){
            console.log(err);
            res.redirect("/employees-find");  
        })
    }
});

router.post('/editemployee',Multer.any("file"),function(req,res){
    if(req.files.length >= 1){
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
            fotoeleitor: fs.readFileSync(__basedir + "/public/Images/Uploads/Fotoeleitor.jpg"),
            reservista: fs.readFileSync(__basedir + "/public/Images/Uploads/Reservista.jpg"),
            identidade: fs.readFileSync(__basedir + "/public/Images/Uploads/Identidade.jpg"),
            fotoctps: fs.readFileSync(__basedir + "/public/Images/Uploads/Fotoctps.jpg"),
            comprovanteresidencia: fs.readFileSync(__basedir + "/public/Images/Uploads/Comprovanteresidencia.jpg"),
            Avatar: fs.readFileSync(__basedir + "/public/Images/Uploads/Avatar.jpg")
        }
        var selector = {
            where : {id : req.body.id }
        }

        CadasterEmployee.update(updateValues,selector).then((results) => {
        res.redirect("/employees-find");

        fs.unlinkSync(__basedir + "/public/Images/Uploads/Fotoeleitor.jpg"),
        fs.unlinkSync(__basedir + "/public/Images/Uploads/Reservista.jpg"),
        fs.unlinkSync(__basedir + "/public/Images/Uploads/Identidade.jpg"),
        fs.unlinkSync(__basedir + "/public/Images/Uploads/Fotoctps.jpg"),
        fs.unlinkSync(__basedir + "/public/Images/Uploads/Comprovanteresidencia.jpg"),
        fs.unlinkSync(__basedir + "/public/Images/Uploads/Avatar.jpg")

        }).catch((err)=>{
        console.log(err);
        res.redirect("/employees-find");  
        });
    }else{
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
                fotoeleitor: req.body.fotoeleitor,
                reservista: req.body.reservista,
                identidade: req.body.identidade,
                fotoctps: req.body.fotoctps,
                comprovanteresidencia: req.body.comprovanteresidencia,
                Avatar: req.body.Avatar
            }
            var selector = {
                where : {id : req.body.id }
            }
    
            CadasterEmployee.update(updateValues,selector).then((results) => {
            res.redirect("/employees-find");

    
            }).catch((err)=>{
            console.log(err);
            res.redirect("/employees-find");  
            });
    }
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
            for(var i=0;i<=results.length-1;i++){
                var base = Buffer.from(results[i].Avatar);
                var conversion = base.toString('base64');
                results[i].Avatar = conversion;
                }     
          res.render('employees-find',{results : results});         
              
        }).catch(function(err){
            
            res.render('home',{cnpj:sessioncnpj});
        })
    }
    else if(req.body.searchParam == 'CPF'){
        CadasterEmployee.findAll({raw:true,where:{cnpj : sessioncnpj, cpf: req.body.search}}).then((results)=>{
    
            res.render('employees-find',{results : results});
              
        }).catch(function(err){
          
            res.render('home',{cnpj:sessioncnpj});
        })
    }
    else if(req.body.searchParam == 'Setor'){
        CadasterEmployee.findAll({raw:true,where:{cnpj : sessioncnpj, setor: req.body.search}}).then((results)=>{
    
            res.render('employees-find',{results : results});
              
        }).catch(function(err){
           
            res.render('home',{cnpj:sessioncnpj});
        })
    }
    else if(req.body.searchParam == 'Cargo'){
        CadasterEmployee.findAll({raw:true,where:{cnpj : sessioncnpj, estatus: req.body.search}}).then((results)=>{
    
            res.render('employees-find',{results : results});
              
        }).catch(function(err){
      
            res.render('home',{cnpj:sessioncnpj});
        })
    }
})

router.post('/login',function(req,res){
     CadasterEnterprise.findByPk(req.body.Cnpj).then((result) => {
        if(req.body.Cnpj == result.cnpj && req.body.Password == result.enterprisepassword){
            console.log("Usuário Autenticado");
            global.sessioncnpj = result.cnpj;
            res.redirect("/employees-find");
        }else{
            console.log("Conta não existente");
        }
     }).catch((err) => {
        
     })

})

module.exports = router;