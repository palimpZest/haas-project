var express = require('express');
var router = express.Router();
const session = require('express-session');
const Hashes = require('../controllers/Hashes');
console.log(session.connected);

router.get('/', function(req, res, next) {
  res.send('Welcome, create an account or login');
});

router.get('/login', function(req, res, next) {
  res.send('Please log in to your account');
});

router.get('/register', function(req, res, next) {
  res.send('Create an account');
});

router.get('/generateDummyHash', function(req, res, next) {
  res.send({ hash: '00000000000000000000000000000000' });
});

router.get('/calculateHash', function(req, res, next) {
  // TODO: change to post method and json structure
  res.send({
    data: 'seald is awesome',
    algorithm: 'md5',
    iteration: 1,
    hash: 'efa2e29e0163e3c120cb295902602395'
  });
});

router.post('api/calculateHash', Hashes.create);

module.exports = router;
