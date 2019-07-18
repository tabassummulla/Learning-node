const route = require('express').Router();

        
route.use('/myaccount', require('./myaccount'));

route.use('/login', require('./login'));

route.use('/register', require('./register'));

route.use('/logout', require('./logout'));

route.use('/profile', require('./profile'));

route.use('/upload', require('./upload'));

exports = module.exports = {
          route
}