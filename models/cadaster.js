const db = require ("./database");


const Cadaster = db.sequelize.define('Enterprises',
{   
    cnpj : {
        type : db.Sequelize.INTEGER,
        primaryKey : true
    },
    name : {
        type : db.Sequelize.STRING
    },
    password : {
        type : db.Sequelize.STRING
    }
});

module.exports = Cadaster;