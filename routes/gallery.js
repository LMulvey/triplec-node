const express       = require('express');
const galleryRoutes  = express.Router();
const config = require('../config/app');

const Gallery = require('../models/galleries');
const Photo = require('../models/photos');

galleryRoutes.get('/', (req, res) => {
    res.render('gallery_main', {config: config.defaultTemplateVars});
});

galleryRoutes.get('/:url', (req, res) => {
    Gallery.find({}, (err, galleryList) => {
        Gallery.findOne({ 'info.url' : req.params.url }, (err, results) => {
            if(results) {
                Photo.find({ 'relation.gallery_id' : results._id }, (err, photos) => {
                    if(err) throw err;
                    res.render('gallery_view', {
                        config: config.defaultTemplateVars,
                        gallery: results,
                        galleryList,
                        photos
                    });
                });  
            } else {
                res.redirect('/');
            }
        });
    });
});

module.exports = galleryRoutes;