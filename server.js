
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const config = require('./config');
var session = require('express-session');
const cors = require('cors');



app.use(cors());
app.options('*', cors());



app.use(session({

          secret:'secret',
          resave:true,
          saveUninitialized:true

}));

app.get('/', function(request, response) {
	if (request.session.loggedin) {
		// response.send('Welcome back, ' + request.session.username + '!');
		response.redirect('/index.html');
	
	} else {
		response.redirect(401, '/login');
	}
	response.end();
});



app.use(bodyParser.json());

app.use('/', express.static(path.join(__dirname, './front-end')));
// app.use('/register', express.static(path.join(__dirname, './front-end/register.html')));
app.use('/js', express.static(path.join(__dirname, './front-end/js')));



app.get('/login', function(request, response) {
          response.sendFile(path.join(__dirname + '/front-end/login.html'));
          
});

app.use('/api', require('./routes/api').route);

app.listen(config.db_port, () => console.log('**Server started on port', config.db_port));