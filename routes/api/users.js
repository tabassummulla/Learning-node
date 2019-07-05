
const User = require('../../database/db').User;
const route = require('express').Router();
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

route.get('/', (req, res) => {

          User.findAll().then((users) => {

                    res.status(200).json(users);

          }).catch((err) => {
                    res.status(500).json({err, message: 'Failed to get users'});


          });

});











route.post('/delete', (req, res) => {

          User.destroy({
                    where: {
                        [Op.and]: [{email_add: req.body.email_add}, {password: req.body.password}]
                    }
          }).then((user) => {

            if(user == 0) {

            res.status(401).json({message: 'Incorrect user details'});

            }

            else{

            res.status(200).json({message: 'Account successfuly deleted'});
            }


        }).catch((err) =>  {
        
            res.status(500).json(err);

            });


});

exports = module.exports = route;