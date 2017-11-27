const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

//photos schema
const photoSchema = mongoose.Schema({
    relation: {
        gallery_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Gallery' }
    },
    url: {
        full: String,
        thumb: String
    },
    info: {
        title: String,
        description: String
    }
});

module.exports = mongoose.model('Photo', photoSchema);