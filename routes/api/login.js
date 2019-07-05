
const User = require('../../database/db').User;
const route = require('express').Router();
const bcrypt = require("bcryptjs");


route.post('/', (req, res) => {
    User.findOne({
        where: {
            email_add: req.body.email_add
        }
    }).then((user) => {

        if (!user) {
            
            res.status(404).json({ message: 'User does not exist, please register' });


        }
        else {
            bcrypt.compare(req.body.password, user.password, (err, valid) => {

                if (valid == true) {

                    res.status(200).json({message: 'Login success' });
            
                }

                else {

                    res.status(401).json({ message: 'Incorrect username and/or password' });

                    console.log(err);

                }

            });


        }
    }).catch((err) => {

        console.log(err);
        res.status(401).json({ message: 'Failed to login' });

    });

});



exports = module.exports = route;