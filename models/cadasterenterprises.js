const db = require ("./database");

const Enterprises = db.sequelize.define('Enterprises',
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

module.exports = Enterprises;