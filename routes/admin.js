const express   = require('express');
const adminRoutes = express.Router();
const config    = require('../config/app');

const Gallery   = require('../models/galleries');
const Photo     = require('../models/photos');

const multerHandler    = require('multer');
const multer    = multerHandler({dest: `./public/img/gallery/tmp`}).array('images');

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

    adminRoutes.get('/photos/upload', (req, res) => {
        Gallery.find({}, (err, results) => {
            if(err) throw err;
            res.render('admin_photo_upload', {
                user: req.user,
                config: config.defaultTemplateVars,
                galleries: results,
                message: req.flash('info')
            });
        });
    });

    adminRoutes.post('/photos/upload', multer, (req, res) => {
        processImageStack(req.files, req.body, (err) => {
            if(err) req.flash('info', 'Error uploading photos.');
            else {
                req.flash('info', 'Photos uploaded successfully!')
                res.redirect('/admin/');
            }
        });
    });

    adminRoutes.get('/galleries/:url', isLoggedIn, (req, res) => {
        GalleryList = Gallery.find({}, (err, results) => {
            if(err) throw err;
            else return results;
        });
        Gallery.findOne({ 'info.url' : req.params.url }, (err, results) => {
            if(err) throw err;
            Photo.find({ 'relation.gallery_id' : results._id }, (err, photos) => {
                res.render('admin_gallery_view', {
                    user: req.user,
                    message: req.flash('info'),
                    config: config.defaultTemplateVars,
                    gallery: results.info,
                    GalleryList,
                    photos
                 });
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

function processImageStack(files, form, cb) {
    files.forEach((file, i) => {
        let formData = parseObject(form, i);
        let galleryId = formData.imageGallery;
        let timestamp = new Date().getTime();
        let imageFileName 
            = `${formData.imageTitle.toLowerCase().replace(/ /g, "_")}-${galleryId}${timestamp}`;
        
        uploader.process(imageFileName, file.path, function(err, image){
            if(err) cb(err);
            else {
               savePhoto(image, formData); 
            }
        });  
    });
    cb(null);
}
   
function savePhoto(image, form) {
    let newPhoto = new Photo();

    newPhoto.relation = { gallery_id: form.imageGallery };
    newPhoto.url = {
        full: image.large.substr(8),
        thumb: image.thumbnail.substr(8)
    };
    newPhoto.info = {
        title: form.imageTitle,
        description: form.imageDesc
    };

    newPhoto.save((err) => { 
        if(err) throw err;
    });
}

function parseObject(form, i) {
    if(typeof form.imageTitle == 'object') {
        form = {
            imageTitle: form.imageTitle[i],
            imageDesc: form.imageDesc[i],
            imageGallery: form.imageGallery[i]
        }
    }
    return form;
}