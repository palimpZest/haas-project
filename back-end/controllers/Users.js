const User = require('../models/User');

const Users = {
  find: function(req, res) {
    User.find({}, function(err, result) {
      res.send(result);
    });
  },
  create: function(req, res) {
    User.create({
      name: 'Robert',
      email: 'thisis@email.com',
      password: 'password123'
    });
    res.end();
  },
  update: function(req, res) {
    User.findOneAndUpdate({ name: 'newBobName' }, { name: 'Robert' }, function(
      err,
      doc,
      result
    ) {
      res.end();
    });
  },
  delete: function(req, res) {
    User.findOneAndRemove({ name: 'Robert' }, function(err, doc, result) {
      res.end();
    });
  }
};

module.exports = Users;
