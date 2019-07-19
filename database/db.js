const Sequelize = require('sequelize');
const config = require('./../config');
const bcrypt = require("bcryptjs");


const db = new Sequelize(config.db_name, config.db_user, config.db_password, {

     host: config.db_host,
     dialect: config.db_dialect,
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
          type: Sequelize.STRING,
          allowNull: false,

     },
     email_add: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
               isEmail: true
          },
          primaryKey: true
     },

    address_line1: {
          type: Sequelize.STRING,
          allowNull: true
     },
     mobile_no: {
          type: Sequelize.STRING,
          allowNull: true
     },
     profilePic:{
          type: Sequelize.BLOB('long'),
          allowNull: true
     },
     last_login: {
          type: Sequelize.DATE
     },
     status: {
          type: Sequelize.ENUM('active', 'inactive'),
          defaultValue: 'active'
     },
     // Timestamps
     createdAt: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.fn('NOW')
     },
     updatedAt: {
          type: Sequelize.DATE,
          // DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP - how it works on my sql TODO: find how it works here 
          defaultValue: Sequelize.fn('NOW')
     }

});







User.prototype.validPassword = function(password) {
     return bcrypt.compareSync(password, this.password);
   };





   

   db.sync().then(
     () => console.log("*****Database created and synced")
).catch((err) => console.log(err));

exports = module.exports = {
     User
};