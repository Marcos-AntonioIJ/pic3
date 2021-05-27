const express = require("express");
const router = express.Router();


router.get('/',(req,res)=>
{
    res.render('login');
})

router.get('/login',(req,res)=>{
    res.render('login');
})

router.post('/add',function(req,res){
    res.send(req.body);
    console.log(req.body);
})

module.exports = router;