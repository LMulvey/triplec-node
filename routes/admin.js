const express   = require('express');
const adminRoutes = express.Router();

const config    = require('../config/app');
const Gallery   = require('../models/galleries');
const multerHandler    = require('multer');
const multer    = multerHandler({dest: `./public/img/gallery`});
const imageProcessor   = require('../lib/processImage');
const uploader = new imageProcessor();

module.exports = function(passport) {

    adminRoutes.get('/', isLoggedIn, (req, res) => {
        Gallery.find({}, (err, results) => {
            if(err) throw err;

            res.render('admin_dashboard', { 
                user: req.user,
                config: config.defaultTemplateVars,
                galleries: results,
                message: req.flash('info')
            });
        });
    });

    adminRoutes.get('/photos/upload', isLoggedIn, (req, res) => {
        res.render('admin_photo_upload', {
            user: req.user,
            config: config.defaultTemplateVars,
            message: req.flash('info'),
            newImage: null
        });
    });

    adminRoutes.post('/photos/upload', multer.single('image'), (req, res) => {
        uploader.process('name', req.file.path, function(err, images){
            if(err) {
                req.flash('info', 'Error uploading image.');
                res.redirect('/admin/photos/upload');
            } else {
                console.log(images);
                res.render('admin_photo_upload', {
                    message: req.flash('info', 'Image successfully uploaded.'),
                    config: config.defaultTemplateVars,
                    newImage: images
                });
            }
          });
    });

    adminRoutes.get('/galleries/:url', isLoggedIn, (req, res) => {
        Gallery.findOne({ 'info.url' : req.params.url }, (err, results) => {
            if(err) throw err;
           
            res.render('admin_gallery_view', {
               user: req.user,
               message: req.flash('info'),
               config: config.defaultTemplateVars,
               gallery: results.info 
            });
        });
    });

    adminRoutes.get('/galleries/create', isLoggedIn, (req, res) => {
        res.render('admin_galleries_create', { 
            user: req.user, 
            message: req.flash('info'),
            config: config.defaultTemplateVars 
        });
    });

    adminRoutes.post('/galleries/create', (req, res) => {
        const { name, description, url } = req.body;
        if(!name || !description) {
            req.flash('info', "Please ensure all fields are filled out.");
            res.redirect('./create');
        } else {
            Gallery.findOne({ 'info.name' : name}, function(err, gallery) {
                if(err) {
                    req.flash('info', 'Error checking database. Contact Lee.');
                    res.redirect('./create');
                }

                if(gallery) {
                    req.flash('info', 'Gallery already exists.');
                    res.redirect('./create');
                } else {
                    var newGallery = new Gallery();

                    newGallery.info = {name, description, url};
                    newGallery.save((err) => {
                        if(err) throw err;
                        req.flash('info', `Gallery '${name}' successfully added!`);
                        res.redirect('/admin');
                    });
                }
            }) 
        }
    });

    // Authentication Handlers
    adminRoutes.get('/login', (req, res) => {
        res.render('admin_login', {message: req.flash('loginMessage'), config: config.defaultTemplateVars});
    });

        adminRoutes.post('/login', passport.authenticate('local-login', {
            successReturnToOrRedirect : '/admin',
            failureRedirect : '/admin/login', 
            failureFlash : true
        }));

    adminRoutes.get('/logout', (req, res) => {
        req.logout();
        res.redirect('/admin');
    });

    adminRoutes.get('/createadmin', (req, res) => {
        // render the page and pass in any flash data if it exists
        res.render('admin_create', { message: req.flash('createMessage'), config: config.defaultTemplateVars });
    });

        adminRoutes.post('/createadmin', passport.authenticate('local-createadmin', {
            successRedirect : '/admin', // redirect to the secure profile section
            failureRedirect : '/admin/createadmin', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

    return adminRoutes;
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();

    // if they aren't redirect them to the login 
    req.session.returnTo = `/admin${req.url}`; // Return from where they came!
    res.redirect('/admin/login');
}