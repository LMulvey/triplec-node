const express       = require('express');
const rootRoutes  = express.Router();
const config = require('../config/app');

rootRoutes.get('/', (req, res) => {
    config.defaultTemplateVars.isHome = true;
    res.render('root', {config: config.defaultTemplateVars});
});

module.exports = rootRoutes;