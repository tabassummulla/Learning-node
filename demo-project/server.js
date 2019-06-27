
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const port = 1000;

app.use(bodyParser.json())
app.use(express.urlencoded({extended:true}));
app.use('/', express.static(path.join(__dirname, '/html')));
app.use('/api', require('./routes/api').route);




app.listen(port, ()=> console.log('**Server started on port', port));