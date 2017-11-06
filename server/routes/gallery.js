const express       = require('express');
const galleryRoutes  = express.Router();

galleryRoutes.get('/', (req, res) => {
    res.render('gallery_main');
});

module.exports = galleryRoutes;