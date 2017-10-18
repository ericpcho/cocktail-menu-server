'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const { Menus } = require('./models');
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
router.post('/', jsonParser, (req, res) => {

  const menuItems = [items];

  const items = { 
    cocktailName: req.body.cocktailName,
    ingredients: req.body.ingredients,
    alcohol: req.body.alcohol,
    baseLiquid: req.body.baseLiquid,
    thumbnail: req.body.thumbnail,
    recipe: req.body.recipe
  };

  Menus
    .create(menuItems)
    .then(menu => {
      res.status(201).json(menu);
    })
    .catch(() => {
      res.status(500).json({error: 'Something went wrong'});
    });
});