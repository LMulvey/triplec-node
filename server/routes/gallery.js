const express       = require('express');
const galleryRoutes  = express.Router();

export default function() {
    galleryRoutes.get("/", function(req, res) {
        res.render('gallery_main');
    });

    return galleryRoutes;
}