// Basic express setup:
const PORT          = process.env.PORT || 8080;
const express       = require('express');
const bodyParser    = require('body-parser');
const path          = require('path');
const app           = express();
app.use(bodyParser.urlencoded({ extended: true }));

// Setup basic serving of files and the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(express.static('public'));

// Routes
const adminRoutes = require('./routes/admin');
const galleryRoutes = require('./routes/gallery');

//app.use("/admin", adminRoutes);
app.use('/gallery', galleryRoutes);

app.listen(PORT, () => {
  console.log(`TripleC website now live on port ${PORT}.`);
});