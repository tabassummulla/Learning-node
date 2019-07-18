const multer = require('multer');
const express = require('express');
const app = express();






let storage = multer.diskStorage({
  destination: (req, file, callback) => {
          callback(null,  '/uploads');
  },
  filename: (req, file, callback) => {
          callback(null, file.fieldname + "-" + Date.now());
  }
});
 
let upload = multer({storage: storage}).array('profilePic');


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