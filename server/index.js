// Basic express setup:
const PORT          = process.env.PORT || 8080;
const express       = require("express");
const bodyParser    = require("body-parser");
const app           = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static("public"));

// Routes
const adminRoutes = require('./routes/admin');
const galleryRoutes = require('./routes/gallery');

// Route those Routes
//app.use("/admin", adminRoutes);
app.use('/gallery', galleryRoutes);

app.listen(PORT, () => {
  console.log(`TripleC website now live on port ${PORT}.`);
});