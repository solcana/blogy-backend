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

router.get("/api/articles/:id", (req, res) => {
  Article.findById(req.params.id)
    .then((article) => {
      if (article) {
        res.status(200).json({ article: article });
      } else {
        // If we couldn't find a document with the matching ID
        res.status(404).json({
          error: {
            name: "DocumentNotFoundError",
            message: "The provided ID does not exist",
          },
        });
      }
    })
    // catch any error (general) that might occur
    .catch((error) => {
      res.status(500).json({ error: error });
    });
});
/**
 * Action: ---- DESTROY
 * Method: ---- DELETE
 * URI: ------ /api/articles/:id
 * Description: ----- DELETE An Article by Article ID
 */

router.delete("/api/articles/:id", (req, res) => {
  Article.findById(req.params.id)
    .then((article) => {
      if (article) {
        // step 1: find the article, if found
        // Pass the result of Mongoose's 'remove' method
        // to the next '.then'
        // step 2: remove the article once found
        return article.remove();
        // this will remove article from database
      } else {
        // If we couldn't find a document with the matching ID
        res.status(404).json({
          error: {
            name: "DocumentNotFoundError",
            message: "The provided ID does not exist",
          },
        });
      }
    })
    .then(() => {
      // If the deletion succeded, return 204 and no JSON
      res.status(204).end();
    })
    // This last part makes sure if there are any
    // other problems, it will catch them
    .catch((error) => {
      res.status(500).json({ error: error });
    });
});

// use await and async, that do better then the above method but shorter

/**
 * Action: ---- UPDATE
 * Method: ---- PUT/ PATCH
 * URI: ------ /api/articles/:id
 * Description: ----- UPDATE An Article by Article ID
 */

router.patch("/api/articles/:id", (req, res) => {
  Article.findById(req.params.id)
    .then((article) => {
      if (article) {
        // Pass the result of Mongoose's '.update' method to the next '.then'
        return article.update(req.body.article);
      } else {
        res.status(404).json({
          error: {
            name: "DocumentNotFoundError",
            message: "The provided ID does not exist",
          },
        });
      }
    })
    .then(() => {
      // If the update succeded, return 204 and no JSON
      res.status(204).end();
    })
    .catch((error) => {
      res.status(500).json({ error: error });
    });
});
// UPDATE is extremely similar to the DELETE

/**
 * Action: ---- CREATE
 * Method: ---- POST
 * URI: ------ /api/articles
 * Description: ----- CREATE a new Article
 */

router.post("/api/articles", (req, res) => {
  Article.create(req.body.article)
    // On a succesfull 'create' action, respond with 201
    // HTTP status and the content of the new Article.
    .then((newArticle) => {
      res.status(201).json({ article: newArticle });
    })
    .catch((error) => {
      res.status(500).json({ error: error });
    });
});

// Export the Router so we can use it in the 'server.js'
module.exports = router;
