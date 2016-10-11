var User = require('./model/user');

module.exports = function(app, helloWorld) {
    app.get('/', function(req, res) {
        console.log(req.cookies);
        console.log("=========================================================");
        console.log(req.session);
        var drinks = [
            { name: 'Bloody Mary', drunkness: 3 },
            { name: 'Martini', drunkness: 5 },
            { name: 'Scotch', drunkness: 10 }
        ];
        var tagline = "Any code of your own that you haven't looked at for six or more months " +
                    "might as well have been written by someone else.";

        helloWorld('Javascript', function (err, data) {
            if(err)
                throw err;
            else
                console.log(data);
        });

        res.render('pages/index', {
            drinks: drinks,
            tagline: tagline
        });
    })
    
    app.get('/about', function (req, res) {
        res.render('pages/about');
    });

    app.get('/login/:username/:password', function(req, res) {
        var newUser = new User();
        newUser.local.username = req.params.username;
        newUser.local.password = req.params.password;
        console.log(newUser.local.username + " " + newUser.local.password);
        newUser.save(function (err){
            if (err)
                throw err;
            else
                res.end('Success!');
        });
    });
}