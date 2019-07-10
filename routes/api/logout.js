

let route = require('express').Router();


route.get('/', function(req,res){
          
	if(req.session) {

                    req.session.destroy(function(err){

                              if(err) {
                                        return next(err);
                              }
                              else{
                                        return res.redirect('/');
                              }
                    });
          }
	
    });

    

exports = module.exports = route;