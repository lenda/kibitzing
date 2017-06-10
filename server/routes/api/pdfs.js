'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../../knex');

router.route('/').get(function(req, res, next){
    knex('pdf')
    .orderBy('id').then(function(pdfs){
      console.log(pdfs)
        res.json(pdfs);
    }).catch(function(err){
        next(new Error(err));
    });
});

router.route('/').post(function(req, res, next){
    knex('pdf')
    .insert({
  path: req.body.path,
  url: req.body.url
})
.returning("*")
.then(function (pdf) {
  res.json(pdf);
})
.catch(function(err){
        next(new Error(err));
    });
});

module.exports = router;
