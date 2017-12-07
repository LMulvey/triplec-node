// Mongoose configuration
const dotenv        = require('dotenv').config();
let user = encodeURIComponent(process.env.DB_USER);
let pass = encodeURIComponent(process.env.DB_PASS);
let db = encodeURIComponent(process.env.DB_NAME);
let url;

if(process.env.NODE_ENV == 'development') {
    url = 'mongodb://localhost/triplec';
} else {
    url = `mongodb://${user}:${pass}@127.0.0.1/${db}?authSource=admin`;
}

module.exports = {url}; 