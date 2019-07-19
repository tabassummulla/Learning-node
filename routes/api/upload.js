const multer = require('multer');
const route = require('express').Router();
const User = require('../../database/db').User;







const multerConf = {

storage: multer.diskStorage({

    destination : function(req,fiie,next){
        next(null, '../../uploads');
    },
    filename: function(req,file,next){
    console.log(file);   
    const ext = file.mimetype.split('/')[1];
    next(null, file.fieldname + '-'+ Date.now() +'.'+ext);
    }
}),

fileFilter: function(req, file, next){
    if(!file){
        next();
    }
    const image = file.mimetype.startsWith('image/');

    
    if(image){
        
        next(null, true);
    }
    else{

        next({message: 'File type not supported'}, false);
    }
}
};


route.post('/photo', multer(multerConf).single('profilePic'),function(req,res){

    if(req.file){

        console.log(req.file);
        req.body.profilePic = req.file.filename;

    }

    console.log(req.body.profilePic);
    User.update(
        {profilePic : req.body.profilePic}, 
        
        { where: {email_add: req.session.username}

        }).then((pic) =>{

            res.status(200).json({message: 'Profile picture uploaded'});
        }).catch((err) =>{

        console.log(err);

            res.status(500).json({message: 'Porfile picture could not be uploaded'});



        });

      });










 
module.exports = route;