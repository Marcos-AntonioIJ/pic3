const db = require ("./database");

const Employees = db.sequelize.define('Employees',
{
    id: {type:db.Sequelize.INTEGER,primaryKey:true, autoIncrement:true},
    cnpj : {type : db.Sequelize.INTEGER},
    employeename : {type : db.Sequelize.STRING} ,
    employeepassword: {type : db.Sequelize.STRING},
    cpf : {type : db.Sequelize.STRING},
    ctps : {type : db.Sequelize.STRING},

});

module.exports = Employees;