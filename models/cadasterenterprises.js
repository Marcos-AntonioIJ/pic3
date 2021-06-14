
const db = require ("./database");

const Enterprises = db.sequelize.define('Enterprises',
{   
    cnpj : {
        type : db.Sequelize.INTEGER,
        primaryKey : true
    },
    enterprisename : {
        type : db.Sequelize.STRING
    },
    enterprisepassword : {
        type : db.Sequelize.STRING
    },
    email: {
        type : db.Sequelize.STRING
    },
    setor:{
        type : db.Sequelize.STRING
    },
    endereco:{
        type : db.Sequelize.STRING
    },
});
    

module.exports = Enterprises;