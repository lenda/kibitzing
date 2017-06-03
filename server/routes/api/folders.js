'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../../knex');

router.route('/').get(function(req, res, next){
  knex('folder')
  .orderBy('id').then(function(folders){
    console.log(folders)
    res.json(folders);
  }).catch(function(err){
    next(new Error(err));
  });
});

router.route('/').post(function(req, res, next){
  knex('folder')
  .insert({
    path: req.body.path
  })
  .returning("*")
  .then(function (folder) {
    res.json(folder);
  })
  .catch(function(err){
    next(new Error(err));
  });
});

module.exports = router;
