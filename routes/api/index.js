const route = require('express').Router();

        
route.use('/users', require('./users'));

route.use('/login', require('./login'));
route.use('/register', require('./register'));
route.use('/logout', require('./register'));
exports = module.exports = {
          route
}