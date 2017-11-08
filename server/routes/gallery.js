const express       = require('express');
const galleryRoutes  = express.Router();

galleryRoutes.get('/', (req, res) => {
    res.render('gallery_main');
});

galleryRoutes.get('/:id', (req, res) => {
    res.render(`gallery_${req.params.id}`);
});

module.exports = galleryRoutes;