// Mongoose configuration
module.exports = {
    url: 'mongodb://localhost/triplec',
    url_production: `mongodb://${process.env.MONGO_URI}/${process.env.DB_NAME}`
};