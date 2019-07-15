
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const config = require('./config');

const session = require('express-session');
const cors = require('cors');


const time = 1000*60*60*2;



app.use(cors());
app.options('*', cors());

app.use(session({
	name: config.session_name,
	secret: config.session_secret,
	resave: false,
	saveUninitialized: false,
	cookie: {
		maxAge: time ,
		sameSite: true
	}
})
);



app.get('/', function(request, response) {

	if (request.session.loggedin) {
		
	
		response.send('<h1> Welcome back , ' + request.session.username + '</h1>');
		response.status(200);


	} else {
		response.redirect(401, '/login');
	}
});



app.use(bodyParser.json());

app.use('/', express.static(path.join(__dirname, './front-end')));
app.use('/js', express.static(path.join(__dirname, './front-end/js')));



app.get('/login', function (request, response) {

	response.sendFile(path.join(__dirname + '/front-end/login.html'));

});




























app.use('/api', require('./routes/api').route);












app.listen(config.db_port, () => console.log('**Server started on port', config.db_port));