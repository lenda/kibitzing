'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../../knex');

router.route('/').get(function(req, res, next){
    knex('pdf')
    .orderBy('id').then(function(folders){
      console.log(folders)
        res.json(folders);
    }).catch(function(err){
        next(new Error(err));
    });
});

router.route('/').post(function(req, res, next){
    knex('pdf')
    .insert({
  path: req.body.path,
  folder_id: req.body.folderId,
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
