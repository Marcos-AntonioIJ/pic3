const Sequelize = require("sequelize");
var sequelize = new Sequelize('bancodedadospic', 'marcosaij', 'youtube123*', {
    host: 'bdpic.database.windows.net',
    dialect: 'mssql',
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    },
    dialectOptions: {
      encrypt: true
    }
  });

sequelize.authenticate().then(function(){
  console.log("DB connected");
}).catch(function(erro){
  console.log("DB connection ERROR",erro);
})

module.exports = {  
  Sequelize: Sequelize,
  sequelize: sequelize
}

