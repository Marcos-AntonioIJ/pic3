const db = require ("./database");

const Employees = db.sequelize.define('Employees',
{
    id: {type:db.Sequelize.INTEGER,primaryKey:true, autoIncrement:true},
    cnpj : {type : db.Sequelize.INTEGER},
    employeename : {type : db.Sequelize.STRING} ,
    employeepassword: {type : db.Sequelize.STRING},
    cpf : {type : db.Sequelize.STRING},
    ctps : {type : db.Sequelize.STRING},
    email:{type : db.Sequelize.STRING},
    sexo: {type : db.Sequelize.STRING},
    setor: {type : db.Sequelize.STRING},
    endereco: {type : db.Sequelize.STRING},
    idade: {type : db.Sequelize.INTEGER},
    telefone:{type : db.Sequelize.STRING},
    estatus:{type : db.Sequelize.STRING},
    salario:{type : db.Sequelize.FLOAT},
    banco:{type : db.Sequelize.STRING},
    agencia:{type : db.Sequelize.INTEGER},
    nconta:{type : db.Sequelize.INTEGER},
    fotoeleitor:{type : db.Sequelize.BLOB("long")},
    reservista:{type : db.Sequelize.BLOB("long")},
    identidade:{type : db.Sequelize.BLOB("long")},
    fotoctps:{type : db.Sequelize.BLOB("long")},
    comprovanteresidencia:{type : db.Sequelize.BLOB("long")},
    Avatar:{type : db.Sequelize.BLOB("long")}

});

module.exports = Employees;