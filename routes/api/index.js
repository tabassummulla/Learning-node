const route = require('express').Router();

// const login = require('./../../front-end/index.html');






// route.use('/login', require(login));

route.use('/users', require('./users'));

route.use('/login', require('./login'));
route.use('/register', require('./register'));

exports = module.exports = {
          route
}