

let route = require('express').Router();
let config = require('../../config');

const redirectLogin = (request, response, next) => {

    if (!request.session.loggedin) {

        response.redirect(401, '/login');

    } else {
        next();
    }
};

route.get('/', function (req, res) {

    if (req.session.loggedin) {
        req.session.destroy(() => {
            console.log('hi');  
             res.status(200).clearCookie(config.session_name);  
        });
    }else{
        console.log('please login first');
    }

});


exports = module.exports = route;