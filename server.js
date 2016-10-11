var express = require('express');
var app = express();
var port = process.env.PORT || process.argv[2] || 3000

var session = require('express-session');
var morgan = require('morgan');
var uuid = require('node-uuid');
var edge = require('edge');
var mongo = require('mongoose');
var bodyParser = require('body-parser');
var configdb = require('./config/database');

mongo.connect(configdb.url);

var helloWorld = edge.func(`
    async (input) => { 
        return ".NET Welcomes " + input.ToString(); 
    }
`);

app.set('view engine', 'ejs');

app.use(morgan('dev'));
app.use(session({
    secret: uuid.v1(),
    saveUninitialized: true,
    resave: true
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/styles'));

// app.get('/', function (req, res) {
//     console.log(req.cookies);
//     console.log("=========================================================");
//     console.log(req.session);
//     var drinks = [
//         { name: 'Bloody Mary', drunkness: 3 },
//         { name: 'Martini', drunkness: 5 },
//         { name: 'Scotch', drunkness: 10 }
//     ];
//     var tagline = "Any code of your own that you haven't looked at for six or more months " +
//                   "might as well have been written by someone else.";

//     helloWorld('Javascript', function (err, data) {
//         if(err)
//             console.log(err);
//         else
//             console.log(data);
//     });

//     res.render('pages/index', {
//         drinks: drinks,
//         tagline: tagline
//     });
// });

require('./app/routes.js')(app, helloWorld);

app.listen(port);
console.log('SERVER LISTENING ON PORT: ' + port);