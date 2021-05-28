const db = require ("./database");


const Post = db.sequelize.define('Enterprises',
{   
    cnpj : {type : db.Sequelize.INTEGER,primaryKey:true},
    password : {type : db.Sequelize.STRING}
});

module.exports = Post;