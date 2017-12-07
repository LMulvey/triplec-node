const express       = require('express');
const rootRoutes  = express.Router();
const config = require('../config/app');

rootRoutes.get('/', (req, res) => {
    config.defaultTemplateVars.isHome = true;
    config.defaultTemplateVars.pageTitle = 'Triple C Woodworx | Custom Furniture by Marc Bünder';
    res.render('root', {config: config.defaultTemplateVars});
});

module.exports = rootRoutes;