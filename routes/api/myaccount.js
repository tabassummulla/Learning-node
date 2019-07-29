
const User = require('../../database/db').User;
const route = require('express').Router();
const Sequelize = require('sequelize');
const Op = Sequelize.Op;




route.post('/delete', (req, res) => {

    User.destroy({
        where: {
            [Op.and]: [{ email_add: req.body.email_add }, { password: req.body.password }]
        }
    }).then((user) => {

        if (user == 0) {

            res.status(401).json({ message: 'Incorrect user details' });

        }

        else {

            res.status(200).json({ message: 'Account successfuly deleted' });
        }


    }).catch((err) => {

        res.status(500).json(err);

    });


});

User.beforeUpdate((user)=>{
    if(user.changed('password')){
   user.password = bcrypt.hashSync(
        user.password,
         bcrypt.genSaltSync(10),
         null
       );
    }
});


route.post('/changePwd', function(req,res){

   if(req.session.loggedin){
    User.update(
        { password: req.body.password },
        {
        where: { email_add: req.session.username }
        }).then((changed)=>{

            res.status(200).json({message: 'Password Changed'});

        }).catch((err)=>{

            console.log(err);
            res.status(500).json({message: 'Failed to change password'});

        });
    }else{
        res.status(401);
    }
});








exports = module.exports = route;