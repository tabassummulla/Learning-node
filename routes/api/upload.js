const multer = require('multer');
const User = require('../../database/db').User;
const route = require('express').Router();
const bcrypt = require("bcryptjs");





let storage = multer.diskStorage({
  destination: (req, file, callback) => {
          callback(null, __basedir + '/uploads');
  },
  filename: (req, file, callback) => {
          callback(null, file.fieldname + "-" + Date.now());
  }
});
 
let upload = multer({storage: storage}).array('userPhoto');


app.post('/photo',function(req,res){
          upload(req,res,function(err) {
              console.log(req.body);
              console.log(req.files);
              if(err) {
                  return res.end("Error uploading file.");
              }
              res.end("File is uploaded");
          });
      });










 
module.exports = upload;