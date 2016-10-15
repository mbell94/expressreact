var express = require('express');
var app = express();
var port = process.env.PORT || process.argv[2] || 3000

var session = require('express-session');
var morgan = require('morgan');
var uuid = require('node-uuid');
var edge = require('edge');
var mongo = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');
var flash = require('connect-flash');

var configdb = require('./config/database');

mongo.connect(configdb.url);
require('./config/passport')(passport);

// var helloWorld = edge.func(`
//     async (input) => { 
//         return ".NET Welcomes " + input.ToString(); 
//     }
// `);

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
    secret: uuid.v1(),
    saveUninitialized: true,
    resave: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/styles'));

require('./app/routes.js')(app, passport);

app.listen(port);
console.log('SERVER LISTENING ON PORT: ' + port);