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

  const menu = req.body;

  // validate menu request body so users are forced to input correct information 


  Menus
    .create(menu)
    .then(menu => {
      res.status(201).json(menu);
    })
    .catch((error) => {
      res.status(500).json({error: 'Something went wrong'});
    });
});

router.get('/:id', (req, res) => {
  Menus
    .findById(req.params.id)
    .then(planet => {
      res.status(200).json(planet);
    })
    .catch(() => {
      res.status(500).json({error: 'Something went wrong'}); 
    });
});

module.exports = { router };