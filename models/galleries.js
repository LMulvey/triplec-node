const mongoose = require('mongoose');

//gallery schema
const gallerySchema = mongoose.Schema({
    info: {
        name: String,
        description: String,
        url: String
    }
});

module.exports = mongoose.model('Gallery', gallerySchema);