'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../../knex');

router.route('/').get(function(req, res, next){
    knex('comment')
    .orderBy('id').then(function(folders){
      console.log(folders)
        res.json(folders);
    }).catch(function(err){
        next(new Error(err));
    });
});

router.route('/').post(function(req, res, next){
  knex('comment')
  .insert({
    thread_id: req.body.threadId,
    user_id: req.body.userId,
    content: req.body.content
  })
  .returning("*")
  .then(function (comment) {
    res.json(comment);
  })
  .catch(function(err){
    next(new Error(err));
  });
});

module.exports = router;
