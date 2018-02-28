"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const { Menus } = require("./models");
const router = express.Router();
const jsonParser = bodyParser.json();

// // Anyone Get
// router.get('/', (req, res) => {
//   //   const query = {};
//   //   if (req.query.alcohol) {
//   //     query.alcohol = req.query.alcohol;
//   //   }
//   //   Cocktails
//   //     .find(query)
//   //     .then(cocktails => res.status(200).json(cocktails));
//   // });
// });

// Anyone Post
router.post("/", jsonParser, (req, res) => {
  const menu = req.body;

  // We don't need validation here bcause this server is private and
  //can only be accessed by a GET request with specific id

  Menus.create(menu)
    .then(menu => {
      console.log("after create", menu);
      res.status(201).json(menu);
    })
    .catch(error => {
      res.status(500).json({ error: "Something went wrong" });
    });
});

router.get("/:id", (req, res) => {
  Menus.findById(req.params.id)
    .then(menu => {
      res.status(200).json(menu);
    })
    .catch(() => {
      res.status(500).json({ error: "Something went wrong" });
    });
});

module.exports = { router };
