const express       = require('express');
const galleryRoutes  = express.Router();
const config = require('../config/app');

galleryRoutes.get('/', (req, res) => {
    res.render('gallery_main', {config: config.defaultTemplateVars});
});

galleryRoutes.get('/:id', (req, res) => {
    res.render(`gallery_${req.params.id}`, {config: config.defaultTemplateVars});
});

module.exports = galleryRoutes;