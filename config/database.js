// Mongoose configuration
const dotenv        = require('dotenv').config();

module.exports = {
    url: 'mongodb://localhost/triplec',
    url_production: process.env.PRODUCTION_URI
}; 