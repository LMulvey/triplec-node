"use strict";

// Basic express setup:
const PORT          = process.env.PORT || 8080;
const express       = require("express");
const bodyParser    = require("body-parser");
const app           = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use('view engine', 'ejs');

// Routes
const adminRoutes = require('./routes/admin.js');
const galleryRoutes = require('./routes/gallery.js');

// Route those Routes
//app.use("/admin", adminRoutes);
//app.use("/gallery-temp", galleryRoutes);

// TO-DO: change route to /gallery once gallery feature is completed.

app.listen(PORT, () => {
  console.log(`TripleC website now live on port ${PORT}.`);
});