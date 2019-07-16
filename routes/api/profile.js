const User = require('../../database/db').User;
const route = require('express').Router();


route.post('/update', function(req,res){

          if(req.session.loggedin){
          
          User.Update(
          {address_line1: req.body.address_line1,
           mobile_no: req.body.mobile_no} , 
          
          { where: req.body.email_add

          }).then((user) =>{

          res.status(200).json({message: 'Profile Updated'});

          }).catch((err) => {
          
          console.log(err);
          res.status(500).json({message: 'Failed to update profile'});


          });

}
});




route.post('/update/address', function(req,res){

          if(req.session.loggedin){
          
          User.update({mobile_no: req.body.mobile_no}, { where: {email_add: req.body.email_add}}
          
          ).then((user) =>{

          res.status(200).json({message:'Profile updated :  added address'});

          }).catch((err) => {
          
          console.log(err);
          res.status(500).json({message: 'Failed to update profile'});


          });

}
});

route.post('/update/mobile', function(req,res){

          if(req.session.loggedin){
          
          User.update(
          {address_line1: req.body.address_line1}, 
          
          { where: {email_add: req.body.email_add}

          }).then((user) =>{

          res.status(200).json({message:'Profile updated : added mobile number'});

          }).catch((err) => {
          
          console.log(err);
          res.status(500).json({message: 'Failed to update profile'});


          });

}
});




route.get('/', function(req,res){

if(!req.session.loggedin){

          res.status(401).json({message: 'Please login to view profile'});
}

User.findOne({

 where : {
          email_add: req.session.username

          }
}).then((user)=>{

res.status(200).json(user);

}).catch((err)=>{

console.log(err);

res.status(501).json({message: 'Could not load profile'});

});

});




exports = module.exports = route;