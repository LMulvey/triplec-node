// Mongoose configuration
const dotenv        = require('dotenv').config();
let user = encodeURIComponent(process.env.DB_USER);
let pass = encodeURIComponent(process.env.DB_PASS);
let db = encodeURIComponent(process.env.DB_NAME);

module.exports = {
    url: 'mongodb://localhost/triplec',
    url_production: `mongodb://${user}:${pass}@127.0.0.1/${db}?authSource=admin`
}; 