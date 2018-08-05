const mongoose = require('mongoose');
const config = require('../config.js');

mongoose.connect(
  config.mongodb,
  { useMongoClient: true }
);

const User = mongoose.model('User', {
  name: String,
  lastName: String,
  password: String
});

module.exports = User;
