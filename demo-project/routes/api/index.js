const route = require('express').Router();

route.use('/users', require('./users'));

route.use('/login', require('./login'));
route.use('/register', require('./register'));




exports = module.exports = {
          route
}