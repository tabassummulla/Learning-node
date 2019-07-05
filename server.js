
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const config = require('./config');

const cors = require('cors');



app.use(cors());
app.options('*', cors());

app.use(bodyParser.json());
// app.use(express.json());   
// app.use(express.urlencoded({ extended: true }));

app.use('/', express.static(path.join(__dirname, './front-end')));


app.use('/api', require('./routes/api').route);

app.listen(config.db_port, () => console.log('**Server started on port', config.db_port));