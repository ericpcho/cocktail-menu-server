'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const { Cocktails } = require('./models');
const router = express.Router();
const jsonParser = bodyParser.json();

// Anyone Get
router.get('/', (req, res) => {
  const query = {};
  if (req.query.alcohol) {
    query.alcohol = req.query.alcohol;
  }
  Cocktails
    .find(query)
    .then(cocktails => res.status(200).json(cocktails));
});

// Anyone Post
router.post('/', jsonParser, (req, res) => {
  const newCocktail = { 
    cocktailName: req.body.cocktailName,
    ingredients: req.body.ingredients,
    alcohol: req.body.alcohol,
    baseLiquid: req.body.baseLiquid,
    thumbnail: req.body.thumbnail,
    recipe: req.body.recipe
  };

  Cocktails
    .create(newCocktail)
    .then(cocktail => {
      res.status(201).json(cocktail);
    })
    .catch(() => {
      res.status(500).json({error: 'Something went wrong'});
    });
});

module.exports = { router };