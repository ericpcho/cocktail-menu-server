'use strict';

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const MenuSchema = mongoose.Schema({
  menuItems: {
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
  },
  menuLink: {
    link: {
      type: String,
      required: true,
      unique: true
    }
  }
});

const Menus = mongoose.models.Menus || mongoose.model('Menus', MenuSchema);

module.exports = { Menus };