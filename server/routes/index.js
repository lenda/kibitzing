"use strict";

const users = require("./api/users.js");
const folders = require("./api/folders.js");
const pdfs = require("./api/pdfs");
const threads = require("./api/threads");
const comments = require("./api/comments");

module.exports = {
  users,
  folders,
  pdfs,
  threads,
  comments
}
