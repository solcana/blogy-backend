//  Require necessary NPM Packages
const express = require("express");

// Instantiate a Router (a mini app that only handles routes)
const router = express.Router();

// the INDEX route is supposed to show us all the data / root of the project
/**
 * Action: -------- INDEX
 * Method: -------- GET
 * URI: --------- /
 * Description: --- Get the Root Route
 */
router.get("/", (req, res) => {
  res.json({ message: "Welcome to Blogy" });
});

// Export the Router so we can use it in the 'server.js'
module.exports = router;
