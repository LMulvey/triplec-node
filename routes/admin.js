const express   = require('express');
const adminRoutes = express.Router();
const config    = require('../config/app');

const Gallery   = require('../models/galleries');
const Photo     = require('../models/photos');

const multerHandler    = require('multer');
const multer    = multerHandler({dest: `./public/img/gallery/tmp`}).array('images');

const fs = require('fs');
const sharp = require('sharp');

const mongoose = require('mongoose');

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

    adminRoutes.post('/photos/upload',isLoggedIn, multer, (req, res) => {
        processImageStack(req.files, req.body, (err) => {
            if(err) req.flash('info', 'Error uploading photos.');
            else {
                req.flash('info', 'Photos uploaded successfully!')
                res.redirect('/admin/');
            }
        });
    });

    adminRoutes.get('/galleries/:url', isLoggedIn, (req, res) => {
        Gallery.find({}, (err, galleryList) => {
            Gallery.findOne({ 'info.url' : req.params.url }, (err, results) => {
                Photo.find({ 'relation.gallery_id' : results._id }, (err, photos) => {
                    if(err) throw err;
                    res.render('admin_gallery_view', {
                        user: req.user,
                        message: req.flash('info'),
                        config: config.defaultTemplateVars,
                        gallery: results,
                        galleryList,
                        photos
                    });
                });  
            });
        });
    });

    adminRoutes.get('/gallery/create', isLoggedIn, (req, res) => {
        res.render('admin_galleries_create', { 
            user: req.user, 
            message: req.flash('info'),
            config: config.defaultTemplateVars 
        });
    });

    adminRoutes.post('/gallery/create', isLoggedIn, (req, res) => {
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

    adminRoutes.post('/galleries/edit', isLoggedIn, (req, res) => {
        processUpdate(req.body, (err) => {
            req.flash('info', `${req.body.name} gallery updated!`);
            res.redirect(`/admin/galleries/${req.body.url}`);     
        });
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

    adminRoutes.get('/createadmin', isLoggedIn, (req, res) => {
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
    let fullSizes = [];
    let thumbnails = [];

    files.forEach((file, i) => {
        let formData = parseObject(form, i);
        let galleryId = formData.imageGallery;
        let timestamp = new Date().getTime();
        let imageFileName 
            = `${formData.imageTitle.toLowerCase().replace(/ /g, "_")}-${galleryId}${timestamp}`;
        
        fullSizes.push(sharp(file.path)
                         .resize(800, 600)
                         .max()
                         .on('error', err => { throw err })
                         .toFile(`./public/img/gallery/${imageFileName}-full.jpg`));
        thumbnails.push(sharp(file.path)
                        .resize(500, 375)
                        .crop(sharp.strategy.attention)
                        .on('error', err => { throw err })
                        .toFile(`./public/img/gallery/${imageFileName}-thumb.jpg`)
                        .then(savePhoto(formData, imageFileName)));
    });
    Promise.all([fullSizes, thumbnails])
    .then(files.forEach(file => fs.unlink(file.path)))
    .then(cb(null));
}

function processUpdate(form, cb) {
    let imageData = {
        imageTitle: form.imageTitle,
        imageDesc: form.imageDesc,
        imageGallery: form.imageGallery,
        deleteImage: form.deleteImage,
        imageId: form.imageId
    };

    Gallery.findById(form.galleryId, (err, doc) => {
        if(err) throw err;

        doc.info.name = form.name || doc.info.name;
        doc.info.description = form.description || doc.info.description;
        doc.info.url = form.url || doc.info.url;

        doc.save((err, item) => {
            if(err) throw err;
        });
    });

    if(typeof imageData.imageId === 'object') {
        imageData.imageId.forEach((image, i) => {
            updatePhoto(image, {
                imageTitle: form.imageTitle[i],
                imageDesc: form.imageDesc[i],
                imageGallery: form.imageGallery[i],
                deleteImage: form.deleteImage[i],
                imageId: form.imageId[i]});
        });
    } else {
        updatePhoto(imageData.imageId, imageData)
    }

    cb(null);   
}

function updatePhoto(imageId, imageData) {
    if(imageData.deleteImage == 'false'){
        Photo.findById(imageId, (err, doc) => {
            if(err) throw err;
            
                doc.info.title = imageData.imageTitle || doc.info.title;
                doc.info.description = imageData.imageDesc || doc.info.description;
                doc.relation.gallery_id = imageData.imageGallery || doc.relation.gallery_id;
    
                doc.save((err, item) => {
                    if(err) throw err;
                }); 
        
        });
    } else {
        Photo.findByIdAndRemove(imageId, (err, doc) => {
            if(err) throw err;
            fs.unlink(`./public${doc.url.full}`, err => {
                if(err) throw err;
            });
            fs.unlink(`./public${doc.url.thumb}`, err => {
                if(err) throw err;
            });
        });
    }
}
   
function savePhoto(form, imageName) {
    return new Promise((resolve, reject) => {
        let newPhoto = new Photo();
        
        newPhoto.relation = { gallery_id: form.imageGallery };
        newPhoto.url = {
            full: `/img/gallery/${imageName}-full.jpg`,
            thumb: `/img/gallery/${imageName}-thumb.jpg`
        };
    
        newPhoto.info = {
            title: form.imageTitle,
            description: form.imageDesc
        };
    
        newPhoto.save((err) => { 
            if(err) reject(err);
        }).then(resolve());
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