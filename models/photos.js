const mongoose = require('mongoose');

//photos schema
const photoSchema = mongoose.Schema({
    relation: {
        gallery_id: Schema.Types.objectId
    },
    url: {
        full: String,
        thumb: String
    },
    info: {
        title: String,
        description: String,
        project: String,
        tags: String
    }
});

module.exports = mongoose.model('Photo', photoSchema);