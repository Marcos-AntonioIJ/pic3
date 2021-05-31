const db = require ("./database");

const Employees = db.sequelize.define('Employees',
{
    cnpj : {type : db.Sequelize.INTEGER},
    employeename : {type : db.Sequelize.STRING} ,
    employeepassword: {type : db.Sequelize.STRING}
});

module.exports = Employees;