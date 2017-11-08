const express       = require('express');
const rootRoutes  = express.Router();

rootRoutes.get('/', (req, res) => {
    res.render('root');
});

module.exports = rootRoutes;