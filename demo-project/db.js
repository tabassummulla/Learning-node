const Sequelize = require('sequelize');

const db = new Sequelize('develop','root', 'password', {

          host: 'localhost',
          dialect : 'mysql', 
          define: {
               charset :'utf8mb4',
               collate: 'utf8mb4_unicode_ci',
               timestamps: false,
               freezeTableName: true 
          },
          pool : {
          min: 0,
          max : 5
          }


});


const User = db.define('users', {

          first_name: {
                   type: Sequelize.STRING,
                   allowNull:false
          },
          last_name: {
                    type: Sequelize.STRING,
                    allowNull:false
           },
           password: {
                    type: Sequelize.STRING,
                    
                    allowNull:false,
                          
           },
           email_add: {
                    type: Sequelize.STRING(128),
                    allowNull:false,
                    primaryKey:true
           },
      // Timestamps
      createdAt: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.fn('NOW')
     },
      updatedAt: {
           type: Sequelize.DATE,
          default: Sequelize.fn('NOW')
     }

});





db.sync().then(
          ()=> console.log("*****Database created and synced")
          ).catch((err) => console.log(err));

exports = module.exports = {
     User
};