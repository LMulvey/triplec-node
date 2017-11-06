const express       = require('express');
const galleryRoutes  = express.Router();

module.exports = function() {
    galleryRoutes.get('/', (req, res) => {
        console.log('route');
    });
    return galleryRoutes;
}