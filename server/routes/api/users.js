'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../../knex');
const bcrypt = require("bcrypt-as-promised");


router.route('/login').post(function(req, res, next){
  knex('user').where("email", req.body.email)
  .then(function(user){
    bcrypt.compare(req.body.password, user[0].hashed_password)
    .then(function(){
      delete user[0].hashed_password;
      delete user[0].created_at;
      delete user[0].updated_at;
      res.json(user);
    }).catch(bcrypt.MISMATCH_ERROR, function(){
      res.send("Sorry, but we couldn't find that email / password combination.");
    })
  }).catch(function(err){
    next(new Error(err));
  });
});

router.route('/register').post(function(req, res, next){
  bcrypt.hash(req.body.password, 3).then(function(hash){
    knex('user')
    .insert({
      email: req.body.email,
      hashed_password: hash,
      photo_url: req.body.photoUrl,
      username: req.body.username
    })
    .returning(["email", "username", "photo_url"])
    .then(function (user) {
      res.json(user);
    })
    .catch(function(err){
      next(new Error(err));
    });
  })
});

module.exports = router;
