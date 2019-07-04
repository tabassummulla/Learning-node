
const User = require('../../config/db').User;
const route = require('express').Router();
const bcrypt = require("bcryptjs");

route.post('/', (req, res) => {

          User.findOne({
                  where : {
                      email_add : req.body.email_add
                  }
              }).then((user) => {

      
                  if(!user){
                      
                    res.redirect('/');

                  }
                  else{

                    bcrypt.compare(req.body.password, user.password, (err,valid) =>{

                        if(valid==true){
                            
                            res.status(200).json({user, message: 'Login success'});
                            
                        }

                        else{

                            res.status(401).json({message: 'Incorrect username and/or password'});

                            console.log(err);

                        }

                    });
      
              
                  }}).catch((err) => {
      
                    res.status(401).json({err, message: 'Failed to login'});
      
          });
      
      }); 



      exports = module.exports = route;