
const User = require('../../db').User;
const route = require('express').Router();

route.get('/', (req, res) => {
          
          User.findAll().then((users) => {

                    res.status(200).send(users);
                    

          }).catch((err) => {

                    console.log(err);

                    res.send(500).send({
                              error: "failed to get response"

                    });




          });

});



route.post('/add', (req, res) => {
          
          User.create({

          first_name: req.body.first_name,
          last_name: req.body.last_name,
          password: req.body.password,
          email_add: req.body.email_add,

          }).then((users => {

          res.status(200).send('Success');

          })).catch((err => {

          
          if(err.name === 'SequelizeUniqueConstraintError' && err.parent.code === 'ER_DUP_ENTRY'){
          
          res.status(500).send('An Account with this email is already registered');

          }

          else {
          
          res.sendstatus(500).send('Failed to register');
          }

          }));



});

exports = module.exports = route;