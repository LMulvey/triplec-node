module.exports = function(app, passport) {

    app.get('/', isLoggedIn, (req, res) => {
        res.render('admin_dashboard', { user: req.user });
    });

    app.get('/createadmin', (req, res) => {
        // render the page and pass in any flash data if it exists
        res.render('admin_create', { message: req.flash('createMessage') });
    });

    // app.post('/createadmin', (req, res) => {}); // post-admin creation stuff

    app.get('/login', (req, res) => {
        res.render('admin_login', {message: req.flash('loginMessage')});
    });

    // app.post('/login', (req, res) => {}); // post-login stuff

    app.get('/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
    
    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated()) return next();

    // if they aren't redirect them to the home page
    res.redirect('/login');
}