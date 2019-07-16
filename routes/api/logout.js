

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
        console.log('logged in reached here');
        req.session.destroy();
        res.clearCookie(config.session_name);  
        res.status(200);

    }else{
        console.log('not logged in');
        res.redirect(401, '/login');
    }

});


exports = module.exports = route;