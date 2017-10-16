'use strict';

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const CocktailSchema = mongoose.Schema({
  cocktailName: {
    type: String,
    required: true,
    unique: true
  },
  ingredients: {
    type: Array,
    required: true,
  },
  alcohol: {
    type: String,
    required: true
  },
  baseLiquid: {
    type: String,
    required: true
  },
  thumbnail: {
    type: String,
    required: true
  },
  recipe: {
    type: String,
    required: true
  },
});

const Cocktails = mongoose.models.Cocktails || mongoose.model('Cocktails', CocktailSchema);

module.exports = { Cocktails };