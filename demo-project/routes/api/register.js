const User = require('../../config/db').User;
const route = require('express').Router();
const bcrypt = require("bcryptjs");



User.beforeCreate(user=> {
          user.password = bcrypt.hashSync(
            user.password,
             bcrypt.genSaltSync(10),
             null
           );
});
      
route.post('/', (req, res) => {
      
          
          //TODO add validation to check if fields are empty 
                User.create({
      
                          first_name: req.body.first_name,
                          last_name: req.body.last_name,
                          password: req.body.password,
                          email_add: req.body.email_add,
      
                      
                }).then((user => {
      
                          res.status(200).json({user, message:'Account created successfuly'});
                          res.redirect(307, "/login");
      
                })).catch((err => {
      
      
                          if (err.name === 'SequelizeUniqueConstraintError' && err.parent.code === 'ER_DUP_ENTRY') {
      
                              res.status(409).json({message: 'An Account with this email is already registered'});
      
                          }
      
                          if(err.name === 'SequelizeValidationError') {
      
                              res.status(400).json({error : { message : err.errors[0].message}});
                          }
      
                          else {
      
                              console.log('@ Post Create User', err);
      
                              res.status(500).json({err, message:'Failed to register'});
                          }
      
                }));
      
      
      
      });
      
      
      
      
      
      
      
      
      



exports = module.exports = route;