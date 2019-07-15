
const User = require('../../database/db').User;
const route = require('express').Router();
const session = require('express-session');
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

                    req.session.loggedin = true;
                    req.session.username = req.body.email_add;
                    
                    console.log(req.session);
                    res.status(200).json({ user, message: 'Login successful' });

                    User.update({
                        last_login: Date.now()
                    }, {
                            where: {
                                email_add: req.body.email_add
                            }
                        }).catch((err) => {
                            console.log(err);
                        });

                }

                else {

                    res.status(401).json({ message: 'Incorrect password' });

                    console.log(err);

                }
            });


        }
    }).catch((err) => {

        console.log(err);
        res.status(401).json({ error: 'Failed to login' });
        res.end();

    });

});



exports = module.exports = route;