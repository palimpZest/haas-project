const mongoose = require('mongoose');
const config = require('../config.js');

mongoose.connect(
  config.mongodb,
  { useMongoClient: true }
);

const Hash = mongoose.model('Hash', {
  data: String,
  algorithm: String,
  iteration: Number,
  hash: String
});

module.exports = Hash;
