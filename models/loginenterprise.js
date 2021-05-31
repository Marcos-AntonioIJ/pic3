const db = require ("./database");


const cEnterprise = db.sequelize.define('Enterprises',
{   
    cnpj : {type : db.Sequelize.INTEGER,primaryKey:true},
    password : {type : db.Sequelize.STRING}
});



module.exports = cEnterprise;