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

        helloWorld('Javascript', function(err, data) {
            if (err)
                throw err;
            else
                console.log(data);
        });

        res.render('pages/index', {
            /* drinks: drinks,
            tagline: tagline */
        });
    })

    app.get('/about', function(req, res) {
        res.render('pages/about');
    });

    app.get('/login/:username/:password', function(req, res) {
        // var newUser = new User();
        // newUser.local.username = req.params.username;
        // newUser.local.password = req.params.password;
        // console.log(newUser.local.username + " " + newUser.local.password);
        // newUser.save(function(err) {
        //     if (err)
        //         throw err;
        //     else
        //         res.end('Success!');
        // });
    });

    app.get('/login', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('pages/login.ejs', { message: req.flash('loginMessage') });
    });

    // process the login form
    // app.post('/login', do all our passport stuff here);

    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form
    app.get('/signup', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('./signup.ejs', { message: "" /*req.flash('signupMessage')*/ });
    });

    // process the signup form
    app.post('/signup', function(req, res) {
        var newUser = new User();
        newUser.local.username = req.body.email;
        newUser.local.password = req.body.password;
        newUser.save(function(err) {
            if (err)
                throw err;
        });
        res.redirect('pages/');
    });

    // =====================================
    // PROFILE SECTION =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('pages/profile.ejs', {
            user: req.user // get the user out of session and pass to template
        });
    });

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
}

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}