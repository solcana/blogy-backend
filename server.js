//  Require necessary NPM Packages
const express = require("express");
const mongoose = require("mongoose");

// Require DB Configuration File
const db = require("./config/db");

// Establish Database Connection
mongoose.connect(db, { useNewUrlParser: true });
mongoose.connection.once("open", () => console.log("Connection to MongoDB"));

// Require Route Files
const indexRouter = require("./routes/index");
const articlesRouter = require("./routes/articles");

// Instantiate Express Application Object
const app = express();

// Define PORT for the API to run on
const port = process.env.PORT || 5000;
// REACT runs o port nr 3000 by default
// so here we need to specifiy a different one
// so they dont run on same port

/**
 * Routes
 *
 * Mount imported Routers
 */
app.use(indexRouter);
app.use(articlesRouter);

// Start the server and listen for requests on given port
app.listen(port, () => console.log(`blogy is listening on port ${port}`));
