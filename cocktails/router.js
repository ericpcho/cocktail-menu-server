'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const { Cocktails } = require('./models');
const router = express.Router();
const jsonParser = bodyParser.json();

// Anyone Get
router.get('/', (req, res) => {
  Cocktails
    .find()
    .then(cocktails => res.status(200).json(cocktails));
});


module.exports = { router };