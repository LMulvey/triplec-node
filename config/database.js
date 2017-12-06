// Mongoose configuration
const dotenv        = require('dotenv').config();

module.exports = {
    url: 'mongodb://localhost/triplec',
    url_production: `mongodb://${process.env.DB_USER}:mongodb://${process.env.DB_PASS}@${process.env.MONGO_URI}/${process.env.DB_NAME}`
}; 