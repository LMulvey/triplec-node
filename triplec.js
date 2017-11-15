// Basic express setup:
const express       = require('express');
const app           = express();
const PORT          = process.env.PORT || 8080;
const mongoose      = require('mongoose');
const passport      = require('passport');
const flash         = require('connect-flash');

const morgan        = require('morgan');
const bodyParser    = require('body-parser');
const cookieParser  = require('cookie-parser');
const session       = require('express-session');
const path          = require('path');

const configDB      = require('./config/database');
// require(./config/passport)(passport); //configure the Passport

mongoose.connect(configDB.url); // Connect to the database

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Setup basic serving of files and the view engine
app.set('view engine', 'ejs');
//app.set('views', path.join(__dirname, '/views'));

//app.set('strict routing', true);
app.use(express.static(__dirname + '/public'));

// required for passport
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// Routes
const rootRoutes = require('./routes/root');
const adminRoutes = require('./routes/admin')(app, passport);
const galleryRoutes = require('./routes/gallery');

//app.use("/admin", adminRoutes);
app.use('/', rootRoutes);
app.use('/gallery', galleryRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Triple C website now live on port ${PORT}.`);
});