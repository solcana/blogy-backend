// Require neccessary NPM Package
const express = require("express");

// Require Mongoose Model for Article
const Article = require("./../models/article");

// Instantiate a Router (mini app that only handles routes)
const router = express.Router();

/**
 * Action: ---- INDEX
 * METHOD: ----- GET
 * URI: ----- /api/articles
 * Description: ----- Get All Articles
 */

router.get("/api/articles", (req, res) => {
  Article.find()
    // Return all Articles as a array
    .then((articles) => {
      res.status(200).json({ articles: articles });
    })
    // Catch any errors that might occure
    .catch((error) => {
      res.status(500).json({ error: error });
    });
});

/**
 * Action: ---- SHOW
 * Method: ---- GET
 * URI: ------ /api/articles/:id
 * Description: ----- Get An Article by Article ID
 */

/**
 * Action: ---- DESTROY
 * Method: ---- DELETE
 * URI: ------ /api/articles/:id
 * Description: ----- DELETE An Article by Article ID
 */

/**
 * Action: ---- UPDATE
 * Method: ---- PUT/ PATCH
 * URI: ------ /api/articles/:id
 * Description: ----- UPDATE An Article by Article ID
 */

/**
 * Action: ---- CREATE
 * Method: ---- POST
 * URI: ------ /api/articles
 * Description: ----- CREATE a new Article
 */

// Export the Router so we can use it in the 'server.js'
module.exports = router;
