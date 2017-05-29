'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../../knex');

router.route('/').get(function(req, res, next){
    knex('user')
    .orderBy('id').then(function(folders){
      console.log(folders)
        res.json(folders);
    }).catch(function(err){
        next(new Error(err));
    });
});

module.exports = router;
