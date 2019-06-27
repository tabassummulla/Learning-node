
const User = require('../../db').User;
const route = require('express').Router();
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

route.get('/', (req, res) => {

          User.findAll().then((users) => {

                    res.status(200).send(users);


          }).catch((err) => {

                    console.log(err);

                    res.send(500).send("Error!");




          });

});



route.post('/createUser', (req, res) => {

          User.create({

                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    password: req.body.password,
                    email_add: req.body.email_add,

          }).then((users => {

                    res.status(200).send('Account created successfuly');

          })).catch((err => {


                    if (err.name === 'SequelizeUniqueConstraintError' && err.parent.code === 'ER_DUP_ENTRY') {

                              res.status(500).send('An Account with this email is already registered');

                    }

                    else {

                              res.sendstatus(500).send('Failed to register');
                    }

          }));



});



route.post('/delete', (req, res) => {

          User.destroy({
                    where: {
                        [Op.and]: [{email_add: req.body.email_add}, {password: req.body.password}]
                    }
          }).then((found) => {

            if(found == 0) {


                res.status(500).send('error');

            }
            else{

            res.status(200).send('account deleted');
            }


        }).catch((err) =>  {
        
            
            res.status(500).send('error');

            });
          
          
          
        //   then((user => {




        //   res.status(200).send('Account successfuly deleted');


        //   })).catch((err => {

          
        //   console.log(err);
        //   res.status(500).send('Could not delete account');

        //   }));

});

exports = module.exports = route;