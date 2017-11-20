let LocalStrategy   = require('passport-local').Strategy;
let Admin            = require('../models/admins');

module.exports = function(passport) {

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        Admin.findById(id, function(err, user) {
            done(err, user);
        });
    });

    passport.use('local-createadmin', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) {
        process.nextTick(function() {

        // find a Admin whose email is the same as the forms email
        // we are checking to see if the Admin trying to login already exists
        Admin.findOne({ 'local.email' :  email }, function(err, user) {
            // if there are any errors, return the error
            if (err)
                return done(err);

            // check to see if theres already a Admin with that email
            if (user) {
                return done(null, false, req.flash('createMessage', 'That email is already taken.'));
            } else {

                // if there is no Admin with that email
                // create the Admin
                var newAdmin            = new Admin();

                // set the Admin's local credentials
                newAdmin.local.email    = email;
                newAdmin.local.firstName = req.body.firstName;
                newAdmin.local.password = newAdmin.generateHash(password);

                // save the Admin
                newAdmin.save(function(err) {
                    if (err)
                        throw err;
                    return done(null, newAdmin);
                });
            }

        });    

        });

    }));


    passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) { // callback with email and password from our form

        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        Admin.findOne({ 'local.email' :  email }, function(err, user) {
            // if there are any errors, return the error before anything else
            if (err)
                return done(err);

            // if no user is found, return the message
            if (!user)
                return done(null, false, req.flash('loginMessage', 'Incorrect credentials.')); 

            // if the user is found but the password is wrong
            if (!user.validPassword(password))
                return done(null, false, req.flash('loginMessage', 'Incorrect credentials.')); 

            // all is well, return successful user
            return done(null, user);
        });

    }));

};
