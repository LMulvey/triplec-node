// Basic express setup:
const express       = require('express');
const app           = express();
const PORT          = process.env.PORT || 8080;

const mongoose      = require('mongoose');
const passport      = require('passport');
const flash         = require('connect-flash');
const helmet        = require('helmet');
const morgan        = require('morgan');
const bodyParser    = require('body-parser');
const cookieParser  = require('cookie-parser');
const session       = require('express-session');
const path          = require('path');
const configDB      = require('./config/database');
const dotenv        = require('dotenv').config();
require('./config/passport')(passport); //configure the Passport

mongoose.connect(configDB.url_production, {useMongoClient: true}); // Connect to the database

//app.use(morgan('dev'));
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Setup basic serving of files and the view engine
app.set('view engine', 'ejs');
app.use(express.static(`${__dirname}/public/`));

// required for passport
app.use(session({
    secret: process.env.SECRET_SESSION,
    name: 'session',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session()); 
app.use(flash());

// Routes
const rootRoutes = require('./routes/root');
const adminRoutes = require('./routes/admin')(passport);
const galleryRoutes = require('./routes/gallery');

app.use('/admin', adminRoutes);
app.use('/', rootRoutes);
app.use('/gallery', galleryRoutes);

app.use(function (req, res, next) {
  res.redirect('/');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Triple C website now live on port ${PORT}.`);
});