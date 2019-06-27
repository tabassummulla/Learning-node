const Sequelize = require('sequelize');

const db = new Sequelize('develop', 'root', 'password', {

     host: 'localhost',
     dialect: 'mysql',
     define: {
          charset: 'utf8mb4',
          collate: 'utf8mb4_unicode_ci',
          timestamps: false,
          freezeTableName: true
     },
     pool: {
          min: 0,
          max: 5
     }


});


const User = db.define('users', {

     first_name: {
          type: Sequelize.STRING,
          allowNull: false
     },
     last_name: {
          type: Sequelize.STRING,
          allowNull: false
     },
     password: {

          //TODO: use bcrypt to encrypt data 
          type: Sequelize.STRING(20),
          allowNull: false,

     },
     email_add: {
          type: Sequelize.STRING(128),
          allowNull: false,
          primaryKey: true
     },
     // Timestamps
     createdAt: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.fn('NOW')
     },
     updatedAt: {
          type: Sequelize.DATE,
          // DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP - how it works on my sql TODO: find how it works here 
          default: Sequelize.fn('NOW')
     }

});





db.sync().then(
     () => console.log("*****Database created and synced")
).catch((err) => console.log(err));

exports = module.exports = {
     User
};