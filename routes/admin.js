let express = require('express');
let adminRoutes = express.Router();

module.exports = function(passport) {

    adminRoutes.get('/', isLoggedIn, (req, res) => {
        res.render('admin_dashboard', { user: req.user });
    });

    adminRoutes.get('/createadmin', (req, res) => {
        // render the page and pass in any flash data if it exists
        res.render('admin_create', { message: req.flash('createMessage') });
    });

    adminRoutes.post('/createadmin', passport.authenticate('local-createadmin', {
        successRedirect : '/admin', // redirect to the secure profile section
        failureRedirect : '/admin/createadmin', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    adminRoutes.get('/login', (req, res) => {
        res.render('admin_login', {message: req.flash('loginMessage')});
    });

    adminRoutes.post('/login', passport.authenticate('local-login', {
        successRedirect : '/admin',
        failureRedirect : '/admin/login', 
        failureFlash : true
    }));

    adminRoutes.get('/logout', (req, res) => {
        req.logout();
        res.redirect('/admin');
    });

    return adminRoutes;
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
    
    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated()) return next();

    // if they aren't redirect them to the home page
    res.redirect('/admin/login');
}